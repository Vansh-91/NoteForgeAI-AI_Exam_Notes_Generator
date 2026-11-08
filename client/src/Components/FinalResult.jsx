
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import MermaidSetup from "./MermaidSetup";
import ChartSetup from "./ChartSetup";
import axios from "axios";

function FinalResult({ result: initialResult }) {

    const { id } = useParams();

    const [savedResult, setSavedResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [quickRevision, setQuickRevision] = useState(false);

    // Fetch an existing note when opened from History
    useEffect(() => {

        if (initialResult || !id) {
            return;
        }

        const fetchNote = async () => {

            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:5000/api/pdf/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                let content = response.data.content;

                // Handle content stored as a JSON string
                if (typeof content === "string") {
                    content = JSON.parse(content);
                }

                // Support content wrapped inside a result property
                if (content?.result) {
                    content = content.result;
                }

                setSavedResult(content);

            } catch (err) {

                console.error("Fetch note error:", err);

                setError(
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    "Unable to load this note."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchNote();

    }, [id, initialResult]);


    // Use new generated result OR previously saved result
    const result = initialResult || savedResult;


    // Download PDF
    const downloadPDF = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/pdf/generate-pdf",
                { result },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: "blob"
                }
            );

            const blob = new Blob(
                [response.data],
                { type: "application/pdf" }
            );

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = "ExamNotesAI.pdf";

            document.body.appendChild(link);
            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error("PDF download failed:", error);

        }
    };


    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-lg text-indigo-600 font-medium">
                    Loading your saved notes...
                </p>
            </div>
        );
    }


    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-red-600 font-medium">
                    {error}
                </p>
            </div>
        );
    }


    // No result available
    if (!result) {
        return null;
    }


    // Safe defaults
    const subTopics = result.subTopics || {};
    const questions = result.questions || {};

    const shortQuestions = questions.short || [];
    const longQuestions = questions.long || [];

    const revisionPoints = Array.isArray(result.revisionPoints)
        ? result.revisionPoints
        : [];

    const charts = Array.isArray(result.charts)
        ? result.charts
        : [];


    const priorityStyles = {
        "⭐": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "⭐⭐": "bg-amber-50 text-amber-700 border-amber-200",
        "⭐⭐⭐": "bg-rose-50 text-rose-700 border-rose-200",
    };


    const markDownComponent = {

        h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-indigo-700 mt-6 mb-4 border-b pb-2">
                {children}
            </h1>
        ),

        h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-indigo-600 mt-5 mb-3">
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                {children}
            </h3>
        ),

        p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-3">
                {children}
            </p>
        ),

        ul: ({ children }) => (
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
                {children}
            </ul>
        ),

        li: ({ children }) => (
            <li className="marker:text-indigo-500">
                {children}
            </li>
        ),

    };


    return (

        <div className="mt-6 p-3 space-y-10 bg-white">

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Generated Notes
                    </h2>

                    {result.topic && (
                        <p className="text-gray-500 mt-2">
                            {result.topic}
                        </p>
                    )}
                </div>


                <div className="flex gap-3">

                    <button
                        onClick={() => setQuickRevision(!quickRevision)}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition
                            ${quickRevision
                                ? "bg-green-600 text-white"
                                : "bg-green-100 text-green-700 hover:bg-green-200"}
                        `}
                    >
                        {quickRevision
                            ? "Exit Revision Mode"
                            : "Quick Revision (5 min)"}
                    </button>


                    <button
                        onClick={downloadPDF}
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        📥 Download PDF
                    </button>

                </div>

            </div>


            {/* SUB TOPICS */}

            {quickRevision && (

                <section>

                    <SectionHeader
                        icon="⭐"
                        title="Sub topics"
                        color="indigo"
                    />

                    <div className="mb-3 flex items-center justify-between">

                        <h4 className="text-sm font-bold text-gray-800">
                            ⭐ Priority Topics
                        </h4>

                        <span className="text-xs text-gray-400">
                            {Object.keys(subTopics).length} levels
                        </span>

                    </div>


                    <div className="space-y-3">

                        {Object.entries(subTopics).map(
                            ([priority, topics], index) => (

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

                                        {(Array.isArray(topics) ? topics : []).map(
                                            (topic, i) => (

                                                <li
                                                    key={`${topic}-${i}`}
                                                    className="flex items-start gap-2 text-sm leading-5 text-gray-600"
                                                >
                                                    <span className="mt-0.5 text-indigo-400">
                                                        •
                                                    </span>

                                                    <span>{topic}</span>

                                                </li>

                                            )
                                        )}

                                    </ul>

                                </motion.div>

                            )
                        )}

                    </div>

                </section>

            )}


            {/* DETAILED NOTES */}

            {!quickRevision && (

                <section>

                    <SectionHeader
                        icon=""
                        title="Detailed Notes"
                        color="purple"
                    />

                    <div className="bg-white border border-gray-200 rounded-xl p-6">

                        <ReactMarkdown components={markDownComponent}>
                            {result.notes || "No detailed notes available."}
                        </ReactMarkdown>

                    </div>

                </section>

            )}


            {/* QUICK REVISION POINTS */}

            {quickRevision && revisionPoints.length > 0 && (

                <section className="rounded-xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200 p-6">

                    <h3 className="font-bold text-green-700 mb-3 text-lg">
                        ⚡ Exam Quick Revision Points
                    </h3>

                    <ul className="list-disc ml-6 space-y-1 text-gray-800">

                        {revisionPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}

                    </ul>

                </section>

            )}


            {/* DIAGRAM */}

            {result.diagram?.data && (

                <section>

                    <SectionHeader
                        icon="📊"
                        title="Diagram"
                        color="cyan"
                    />

                    <MermaidSetup diagram={result.diagram.data} />

                </section>

            )}


            {/* CHARTS */}

            {charts.length > 0 && (

                <section>

                    <SectionHeader
                        icon="📈"
                        title="Visual Charts"
                        color="indigo"
                    />

                    <ChartSetup charts={charts} />

                    <p className="mt-3 text-xs text-gray-500 italic">
                        ℹ️ You can save this chart for future reference by taking a screenshot.
                    </p>

                </section>

            )}


            {result.charts && charts.length === 0 && (

                <p className="text-sm text-gray-400 italic">
                    📉 Charts are not relevant for this topic.
                </p>

            )}


            {/* IMPORTANT QUESTIONS */}

            <section>

                <SectionHeader
                    icon="❓"
                    title="Important Questions"
                    color="rose"
                />


                <p className="font-medium">
                    Short Questions:
                </p>

                <ul className="list-disc ml-6 text-gray-700">

                    {shortQuestions.map((question, index) => (
                        <li key={index}>{question}</li>
                    ))}

                </ul>


                <p className="font-medium mt-4">
                    Long Questions:
                </p>

                <ul className="list-disc ml-6 text-gray-700">

                    {longQuestions.map((question, index) => (
                        <li key={index}>{question}</li>
                    ))}

                </ul>


                <p className="font-medium mt-4">
                    Diagram Question:
                </p>

                <ul className="list-disc ml-6 text-gray-700">

                    {questions.diagram && (
                        <li>{questions.diagram}</li>
                    )}

                </ul>

            </section>

        </div>

    );

}


function SectionHeader({ icon, title, color }) {

    const colors = {

        indigo: "from-indigo-100 to-indigo-50 text-indigo-700",
        purple: "from-purple-100 to-purple-50 text-purple-700",
        blue: "from-blue-100 to-blue-50 text-blue-700",
        green: "from-green-100 to-green-50 text-green-700",
        cyan: "from-cyan-100 to-cyan-50 text-cyan-700",
        rose: "from-rose-100 to-rose-50 text-rose-700",

    };

    return (

        <div
            className={`
                mb-4 px-4 py-2 rounded-lg
                bg-gradient-to-r ${colors[color] || colors.indigo}
                font-semibold flex items-center gap-2
            `}
        >

            <span>{icon}</span>
            <span>{title}</span>

        </div>

    );

}


export default FinalResult;
