
import React from "react";
import { motion } from "motion/react";

function Sidebar({ result }) {
  if (!result) return null;

  const subTopics = result.subTopics || {};
  const questions = result.questions || {};
  const shortQuestions = questions.short || [];
  const longQuestions = questions.long || [];

  const priorityStyles = {
    "⭐": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "⭐⭐": "bg-amber-50 text-amber-700 border-amber-200",
    "⭐⭐⭐": "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
    >
      {/* Sidebar heading */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
          📌
        </div>

        <div>
          <h3 className="font-bold text-gray-900">Quick Exam View</h3>
          <p className="mt-1 text-xs text-gray-500">
            Your revision dashboard
          </p>
        </div>
      </div>

      {/* Exam importance */}
      <section className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
          🔥 Exam Importance
        </p>

        <p className="mt-2 text-xl font-bold text-amber-800">
          {result.importance || "Not specified"}
        </p>

        <p className="mt-1 text-xs leading-5 text-amber-700">
          AI-generated priority for revision.
        </p>
      </section>

      {/* Quick statistics */}
      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Subtopics</p>
          <p className="mt-1 text-2xl font-bold text-indigo-600">
            {Object.values(subTopics).reduce(
              (total, topics) =>
                total + (Array.isArray(topics) ? topics.length : 0),
              0
            )}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Questions</p>
          <p className="mt-1 text-2xl font-bold text-purple-600">
            {shortQuestions.length + longQuestions.length}
          </p>
        </div>
      </section>

      {/* Priority-wise subtopics */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-gray-800">
            ⭐ Priority Topics
          </h4>
          <span className="text-xs text-gray-400">
            {Object.keys(subTopics).length} levels
          </span>
        </div>

        <div className="space-y-3">
          {Object.entries(subTopics).map(([priority, topics], index) => (
            <motion.div
              key={priority}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-gray-200 p-3 transition-colors hover:border-indigo-200"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span
                  className={`rounded-md border px-2 py-1 text-xs font-semibold ${
                    priorityStyles[priority] ||
                    "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {priority} Priority
                </span>

                <span className="text-xs text-gray-400">
                  {Array.isArray(topics) ? topics.length : 0}
                </span>
              </div>

              <ul className="space-y-2">
                {(Array.isArray(topics) ? topics : []).map((topic, i) => (
                  <li
                    key={`${topic}-${i}`}
                    className="flex items-start gap-2 text-sm leading-5 text-gray-600"
                  >
                    <span className="mt-0.5 text-indigo-400">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Question overview */}
      <section>
        <h4 className="mb-3 text-sm font-bold text-gray-800">
          🎯 Question Overview
        </h4>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-indigo-50 p-3">
            <span className="text-sm text-indigo-800">
              Short questions
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-indigo-700">
              {shortQuestions.length}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-purple-50 p-3">
            <span className="text-sm text-purple-800">
              Long questions
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-purple-700">
              {longQuestions.length}
            </span>
          </div>
        </div>
      </section>

      {/* Revision tip */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
        <p className="text-sm font-semibold text-emerald-800">
          💡 Revision Tip
        </p>
        <p className="mt-1 text-xs leading-5 text-emerald-700">
          Start with high-priority topics, then practice short and long
          questions to check your understanding.
        </p>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
