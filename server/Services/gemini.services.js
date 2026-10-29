
const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 10000;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableStatus = (status) =>
  status === 408 ||
  status === 429 ||
  (status >= 500 && status <= 599);

const getRetryDelay = (retryIndex) => {
  // Exponential delay: 1s, 2s, 4s, ...
  const exponentialDelay = Math.min(
    BASE_DELAY_MS * 2 ** retryIndex,
    MAX_DELAY_MS
  );

  // Full jitter: random delay between 0 and the exponential delay.
  return Math.random() * exponentialDelay;
};

export const generateGeminiResponse = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  const requestBody = {
    model: "gemini-3.1-flash-lite",
    input: `${prompt}

Return only valid JSON. Do not use Markdown code fences.`,
  };

  let data;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/interactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify(requestBody),
          signal: AbortSignal.timeout(60000),
        }
      );

      data = await response.json().catch(() => ({}));

      if (response.ok) {
        break;
      }

      const message =
        data?.error?.message || `Gemini API error: ${response.status}`;

      // Do not retry invalid requests, authentication errors,
      // permission errors, or exhausted billing/prepay credits.
      if (
        !isRetryableStatus(response.status) ||
        attempt === MAX_ATTEMPTS - 1
      ) {
        throw new Error(message);
      }

      const delay = getRetryDelay(attempt);

      console.warn(
        `Gemini returned HTTP ${response.status}. ` +
        `Retrying in ${Math.round(delay)}ms ` +
        `(attempt ${attempt + 1}/${MAX_ATTEMPTS - 1} retries).`
      );

      await sleep(delay);
    } catch (error) {
      // Errors thrown for non-retryable HTTP responses must propagate.
      if (
        error.message?.startsWith("Gemini API error:") ||
        attempt === MAX_ATTEMPTS - 1
      ) {
        throw error;
      }

      // Retry network failures and timeouts; do not retry JSON parsing
      // or other errors that happen after a successful response.
      const delay = getRetryDelay(attempt);

      console.warn(
        `Gemini request failed: ${error.message}. ` +
        `Retrying in ${Math.round(delay)}ms.`
      );

      await sleep(delay);
    }
  }

  if (!data) {
    throw new Error("Gemini did not return a response");
  }

  const generatedText =
    data.output_text ||
    data.output
      ?.filter((item) => item.type === "text")
      .map((item) => item.text)
      .join("") ||
    data.steps
      ?.filter((step) => step.type === "model_output")
      .flatMap((step) => step.content || [])
      .filter((item) => item.type === "text")
      .map((item) => item.text)
      .join("");

  if (!generatedText) {
    throw new Error("Gemini returned no generated text");
  }

  const cleanText = generatedText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(cleanText);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }
};
