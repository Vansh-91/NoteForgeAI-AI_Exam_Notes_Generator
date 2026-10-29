
import notesModel from "../Models/notesModel.js";
import User from "../Models/userModel.js";
import { buildPrompt } from "../PromptBuilder.js";
import { generateGeminiResponse } from "../Services/gemini.services.js";

export const generateNotes = async (req, res) => {
  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    // 1. Validate input
    if (typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({
        message: "Topic is required",
      });
    }

    // 2. Find authenticated user
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 3. Check credits
    const COST = 10;

    if (user.credits < COST) {
      return res.status(403).json({
        message: "Insufficient credits",
      });
    }

    // 4. Build the prompt
    const prompt = buildPrompt({
      topic: topic.trim(),
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    // 5. Generate notes using Gemini
    const aiResponse = await generateGeminiResponse(prompt);

    // 6. Save generated notes in MongoDB
    const notes = await notesModel.create({
      user: user._id,
      topic: topic.trim(),
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    // 7. Deduct credits after successful generation and note creation
    user.credits -= COST;
    user.isCreditAvailable = user.credits >= COST;

    await user.save();

    // 8. Return notes to frontend
    return res.status(200).json({
      message: "Notes generated successfully",
      data: aiResponse,
      notesId: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
  console.error("Generate notes error:", error);
  console.error("Error message:", error.message);
  console.error("Stack:", error.stack);

  return res.status(500).json({
    message: "AI generation failed. Please try again.",
    error: error.message, // Temporary debugging only
  });
}
};
