
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import TopicForm from "../Components/TopicForm";
import { useState } from "react";

function Notes() {
  const navigate = useNavigate();
  const { user, loading: userLoading } = useUser();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-white px-4 text-black">
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto mt-8 flex max-w-7xl flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-black/95 via-black/85 to-black/95 px-6 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-8"
      >
        <motion.div
          onClick={() => navigate("/Home")}
          whileHover={{ x: 3 }}
          className="cursor-pointer"
        >
          <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-2xl font-bold text-transparent">
            ExamNotes AI
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            AI-powered exam-oriented notes & revision
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            onClick={() => navigate("/pricing")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white shadow-md transition-colors hover:bg-white/15"
          >
            <span className="text-xl" aria-hidden="true">💎</span>
            <span className="font-semibold">
              {userLoading ? "..." : user?.credits ?? 0}
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
              +
            </span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate("/history")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white shadow-md transition-colors hover:bg-white/15"
          >
            <span className="text-lg" aria-hidden="true">📝</span>
            <span className="font-medium">My Notes</span>
          </motion.button>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl py-8">
        <TopicForm
          loading={loading}
          setError={setError}
          setResult={setResult}
          setLoading={setLoading}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </motion.div>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex h-40 flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-black"
            />
            <p className="text-sm text-gray-600">
              Generating your exam-oriented notes...
            </p>
          </motion.div>
        )}

        {!loading && !result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="mt-6 flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-500 shadow-inner"
          >
            <span className="mb-3 text-4xl">📘</span>
            <p className="text-sm">Generated notes will appear here</p>
          </motion.div>
        )}

        {!loading && result && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
          >
            <h2 className="mb-4 text-2xl font-bold">Your Generated Notes</h2>
            <div className="whitespace-pre-wrap leading-7 text-gray-700">
              {typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2)}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}

export default Notes;
