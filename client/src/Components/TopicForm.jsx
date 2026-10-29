
import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";

function TopicForm({setResult,setLoading,loading,setError}) {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setrevisionmode] = useState(false);
  const [includeDiagram, setincludeDiagram] = useState(false);
  const [includeChart, setincludeChart] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const token=localStorage.getItem("token")
     if (!token) {
        throw new Error("Please log in before generating notes.");
      }
      setLoading(true);
  setError("");
  setResult(null);
try{
    const response=await axios.post("http://localhost:5000/api/notes/generate",{topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,},{
        headers:{
            Authorization:`Bearer ${token}`,
        }
      })
    setResult(response.data.data)
    console.log("Generated notes:", response.data.data);
      console.log("Notes ID:", response.data.notesId);
      console.log("Credits left:", response.data.creditsLeft);

}
catch(err){
    console.log(err);
}
finally{
    setLoading(false);
}
  
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-gradient-to-br from-black/90 via-black/80 to-black/90 p-8 text-white shadow-[0_25px_60px_rgba(0,0,0,0.75)] backdrop-blur-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Topic (e.g. Web Development)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          <input
            type="text"
            placeholder="Enter Class/Level (e.g. B.Tech CSE)"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          <input
            type="text"
            placeholder="Enter Exam Type (e.g. University Exam)"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            required
            className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div className="space-y-5 pt-2">
          <Toggle
            label="Set Revision Mode"
            checked={revisionMode}
            onChange={() => setrevisionmode((prev) => !prev)}
          />

          <Toggle
            label="Include Diagram"
            checked={includeDiagram}
            onChange={() => setincludeDiagram((prev) => !prev)}
          />

          <Toggle
            label="Include Chart"
            checked={includeChart}
            onChange={() => setincludeChart((prev) => !prev)}
          />
        </div>

   <motion.button
  whileHover={!loading ? { scale: 1.05, y: -2 } : {}}
  whileTap={!loading ? { scale: 0.95 } : {}}
  disabled={loading}
  className={`
    w-full mt-4
    py-3 rounded-xl
    font-semibold
    flex items-center justify-center gap-3
    transition
    ${
      loading
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-gradient-to-br from-white to-gray-200 text-black shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
    }
  `}
>
  {loading ? "Generating Notes..." : "Generate Notes"}

</motion.button>

{loading && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 space-y-3"
  >
    <div className="flex items-center justify-between text-sm">
      <motion.span
        key="status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-300"
      >
        AI is generating your notes...
      </motion.span>

      <span className="text-green-300">Please wait</span>
    </div>

    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400"
        initial={{ width: "0%" }}
        animate={{ width: ["0%", "70%", "85%", "92%"] }}
        transition={{
          duration: 12,
          times: [0, 0.4, 0.75, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>

    <p className="text-xs text-gray-400">
      Analyzing your topic, preparing explanations, and organizing exam questions.
    </p>
  </motion.div>
)}

      </form>
   
    </motion.div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="flex w-full items-center justify-between gap-4 text-left"
    >
      <span
        className={`text-sm transition-colors ${
          checked ? "text-green-300" : "text-gray-300"
        }`}
      >
        {label}
      </span>

      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(34,197,94,0.35)"
            : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.25 }}
        className="relative h-6 w-12 shrink-0 rounded-full border border-white/20"
      >
        <motion.div
          animate={{ x: checked ? 24 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute left-0 top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        />
      </motion.div>
    </button>
  );
}

export default TopicForm;
