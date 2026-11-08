
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
const API = import.meta.env.VITE_API_URL;
function History() {

    const navigate = useNavigate();

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    // Fetch saved notes
    useEffect(() => {

        const fetchNotes = async () => {

            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login to access your notes.");
                    return;
                }

                const response = await axios.get(
                    `${API}/api/pdf/getnotes`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setTopics(response.data);

            } catch (err) {

                console.error("History error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load your notes. Please try again."
                );

            } finally {
                setLoading(false);
            }

        };

        fetchNotes();

    }, []);


    // Search notes by topic
    const filteredTopics = topics.filter((note) =>
        note.topic?.toLowerCase().includes(search.toLowerCase())
    );


    // Format date
    const formatDate = (date) => {

        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    };


    return (

        <div className="min-h-screen bg-[#080B14] text-white">

            {/* BACKGROUND EFFECTS */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />

                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />

            </div>


            {/* NAVBAR */}

            <header className="relative z-10 border-b border-white/10 bg-[#0B1020]/80 backdrop-blur-xl">

                <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-4 flex items-center justify-between">

                    <div
                        onClick={() => navigate("/Home")}
                        className="cursor-pointer"
                    >

                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">

                            <span className="text-white">ExamNotes</span>

                            <span className="text-indigo-400"> AI</span>

                        </h1>

                        <p className="text-[10px] text-gray-500 tracking-[3px] uppercase mt-1">
                            Smart Learning Platform
                        </p>

                    </div>


                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => navigate("/Home")}
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 text-sm transition"
                        >
                            <span>⌂</span>
                            Home
                        </button>

                        <button
                            onClick={() => navigate("/notes")}
                            className="px-4 md:px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition"
                        >
                            + New Notes
                        </button>

                    </div>

                </div>

            </header>


            {/* MAIN LAYOUT */}

            <div className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-10 py-8 md:py-12">

                <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">


                    {/* SIDEBAR */}

                    <aside className="hidden lg:block">

                        <div className="sticky top-8 bg-[#111827]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">

                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
                                Workspace
                            </p>


                            <div className="space-y-2">

                                <button
                                    onClick={() => navigate("/Home")}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition text-left"
                                >
                                    <span>⌂</span>
                                    Dashboard
                                </button>


                                <button
                                    onClick={() => navigate("/notes")}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition text-left"
                                >
                                    <span>✦</span>
                                    Generate Notes
                                </button>


                                <button
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 font-medium text-left"
                                >
                                    <span>◷</span>
                                    Notes History
                                </button>


                                <button
                                    onClick={() => navigate("/pricing")}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition text-left"
                                >
                                    <span>◇</span>
                                    Pricing
                                </button>

                            </div>


                            <div className="mt-10 p-4 rounded-xl bg-gradient-to-br from-indigo-500/15 to-blue-500/5 border border-indigo-500/20">

                                <div className="text-2xl mb-3">📚</div>

                                <h3 className="font-semibold text-sm mb-2">
                                    Keep Learning!
                                </h3>

                                <p className="text-xs text-gray-400 leading-relaxed">
                                    Your generated notes are always available here for quick revision.
                                </p>

                                <button
                                    onClick={() => navigate("/notes")}
                                    className="mt-4 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
                                >
                                    Create new notes →
                                </button>

                            </div>

                        </div>

                    </aside>


                    {/* MAIN CONTENT */}

                    <main className="min-w-0">


                        {/* PAGE INTRO */}

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-9"
                        >

                            <div className="flex items-center gap-2 mb-3">

                                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />

                                <p className="text-xs font-semibold uppercase tracking-[3px] text-indigo-400">
                                    Your Personal Library
                                </p>

                            </div>


                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

                                <div>

                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                        Notes <span className="text-indigo-400">History</span>
                                    </h2>

                                    <p className="text-gray-400 mt-3 text-sm md:text-base">
                                        All your previously generated AI-powered study notes in one place.
                                    </p>

                                </div>


                                <div className="flex items-center gap-3 bg-[#111827] border border-white/10 rounded-xl px-5 py-3">

                                    <span className="text-2xl">📖</span>

                                    <div>
                                        <p className="text-2xl font-bold">
                                            {topics.length}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Total Notes
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </motion.div>


                        {/* SEARCH BAR */}

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-8"
                        >

                            <div className="relative">

                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search your notes by topic..."
                                    className="w-full bg-[#111827]/80 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition"
                                />

                            </div>

                        </motion.div>


                        {/* SECTION TITLE */}

                        <div className="flex items-center justify-between mb-5">

                            <div>

                                <h3 className="text-lg font-semibold text-white">
                                    Your Saved Notes
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    {filteredTopics.length} notes found
                                </p>

                            </div>

                            <span className="text-xs text-gray-500">
                                Newest first ↓
                            </span>

                        </div>


                        {/* LOADING */}

                        {loading && (

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {[1, 2, 3, 4].map((item) => (

                                    <div
                                        key={item}
                                        className="h-56 rounded-2xl bg-[#111827] border border-white/10 animate-pulse"
                                    />

                                ))}

                            </div>

                        )}


                        {/* ERROR */}

                        {!loading && error && (

                            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center">

                                <div className="text-3xl mb-3">⚠️</div>

                                <h3 className="font-semibold text-red-400">
                                    Something went wrong
                                </h3>

                                <p className="text-sm text-gray-400 mt-2">
                                    {error}
                                </p>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-5 px-5 py-2 rounded-xl bg-red-500/10 text-red-300 hover:bg-red-500/20 transition text-sm"
                                >
                                    Try Again
                                </button>

                            </div>

                        )}


                        {/* EMPTY STATE */}

                        {!loading && !error && topics.length === 0 && (

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl border border-dashed border-white/15 bg-[#111827]/50 p-12 text-center"
                            >

                                <div className="w-20 h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 text-4xl">
                                    📚
                                </div>

                                <h3 className="text-xl font-semibold mb-2">
                                    Your library is empty
                                </h3>

                                <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                                    You haven't generated any notes yet. Create your first set of AI-powered exam notes to get started.
                                </p>

                                <button
                                    onClick={() => navigate("/notes")}
                                    className="mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition"
                                >
                                    Generate Your First Notes →
                                </button>

                            </motion.div>

                        )}


                        {/* SEARCH EMPTY STATE */}

                        {!loading && !error && topics.length > 0 && filteredTopics.length === 0 && (

                            <div className="rounded-2xl border border-white/10 bg-[#111827]/50 p-10 text-center">

                                <div className="text-3xl mb-3">🔍</div>

                                <h3 className="font-semibold">
                                    No matching notes found
                                </h3>

                                <p className="text-gray-500 text-sm mt-2">
                                    Try searching with another topic name.
                                </p>

                            </div>

                        )}


                        {/* NOTES GRID */}

                        {!loading && !error && filteredTopics.length > 0 && (

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                                <AnimatePresence>

                                    {filteredTopics.map((topic, index) => (

                                        <motion.div
                                            key={topic._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.35,
                                                delay: index * 0.05
                                            }}
                                            whileHover={{ y: -5 }}
                                            className="group relative overflow-hidden rounded-2xl bg-[#111827]/90 border border-white/10 hover:border-indigo-500/40 p-6 shadow-lg shadow-black/10 transition-colors"
                                        >

                                            {/* CARD GLOW */}

                                            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />


                                            {/* CARD TOP */}

                                            <div className="relative flex items-start justify-between gap-4 mb-6">

                                                <div className="flex items-start gap-4 min-w-0">

                                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
                                                        📘
                                                    </div>

                                                    <div className="min-w-0">

                                                        <h3 className="text-lg font-semibold text-white capitalize truncate">
                                                            {topic.topic}
                                                        </h3>

                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Created {formatDate(topic.createdAt)}
                                                        </p>

                                                    </div>

                                                </div>


                                                <span className="shrink-0 text-[10px] uppercase tracking-wider font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-full">
                                                    {topic.examType || "General"}
                                                </span>

                                            </div>


                                            {/* CARD DETAILS */}

                                            <div className="relative grid grid-cols-2 gap-3 mb-6">

                                                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">

                                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                                                        Class Level
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-200">
                                                        {topic.classLevel || "N/A"}
                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">

                                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                                                        Revision Mode
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-200">
                                                        {topic.revisionMode ? "Enabled" : "Disabled"}
                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">

                                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                                                        Diagram
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-200">
                                                        {topic.includeDiagram ? "Included" : "Not included"}
                                                    </p>

                                                </div>


                                                <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">

                                                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                                                        Chart
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-200">
                                                        {topic.includeChart ? "Included" : "Not included"}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* VIEW BUTTON */}

                                            <button
                                                onClick={() => navigate(`/notes/${topic._id}`)}
                                                className="relative w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-600 hover:border-indigo-500 hover:text-white font-semibold text-sm transition duration-300"
                                            >
                                                View Notes

                                                <span className="group-hover:translate-x-1 transition-transform">
                                                    →
                                                </span>

                                            </button>

                                        </motion.div>

                                    ))}

                                </AnimatePresence>

                            </div>

                        )}


                        {/* FOOTER */}

                        {!loading && !error && topics.length > 0 && (

                            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">

                                <p className="text-xs text-gray-500">
                                    Your learning journey, organized in one place.
                                </p>

                                <button
                                    onClick={() => navigate("/notes")}
                                    className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition"
                                >
                                    + Generate more notes
                                </button>

                            </div>

                        )}

                    </main>

                </div>

            </div>

        </div>

    );

}

export default History;
