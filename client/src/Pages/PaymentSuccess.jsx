
import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-indigo-50 flex items-center justify-center px-5">

            <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-green-100 p-8 text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6"
                >
                    <span className="text-4xl text-green-600">✓</span>
                </motion.div>

                <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">
                    Payment Complete
                </span>

                <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
                    Thank You!
                </h1>

                <p className="text-gray-500 mt-3 leading-relaxed">
                    Your payment has been completed successfully.
                    Your ExamNotes AI credits will be updated shortly
                    after payment verification.
                </p>

                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-7">
                    <p className="text-sm font-semibold text-green-800">
                        What's next?
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                        Head back to ExamNotes AI and start generating
                        your exam-ready notes.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/Home")}
                    className="w-full mt-7 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    Go to Dashboard →
                </button>

                <p className="text-xs text-gray-400 mt-5">
                    Thank you for choosing ExamNotes AI.
                </p>
            </motion.div>
        </div>
    );
}

export default PaymentSuccess;
