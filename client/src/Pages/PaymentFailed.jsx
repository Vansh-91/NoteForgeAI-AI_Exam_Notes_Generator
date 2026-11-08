
import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-5">

            <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white w-full max-w-md rounded-3xl shadow-xl border border-red-100 p-8 text-center"
            >
                {/* Failure Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6"
                >
                    <span className="text-4xl text-red-600">×</span>
                </motion.div>

                <span className="text-sm font-semibold text-red-500 uppercase tracking-widest">
                    Payment Unsuccessful
                </span>

                <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
                    Payment Failed
                </h1>

                <p className="text-gray-500 mt-3 leading-relaxed">
                    Your payment could not be completed or was cancelled.
                    Don't worry, your account and existing credits are safe.
                </p>

                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mt-7">
                    <p className="text-sm font-semibold text-red-800">
                        What can you do?
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                        You can try again by selecting a credit plan.
                        If money was deducted, please check your payment
                        status before retrying.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/pricing")}
                    className="w-full mt-7 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
                >
                    Try Again
                </button>

                <button
                    onClick={() => navigate("/Home")}
                    className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
                >
                    Back to Dashboard
                </button>

                <p className="text-xs text-gray-400 mt-5">
                    Need help? Contact our support team.
                </p>
            </motion.div>
        </div>
    );
}

export default PaymentFailed;
