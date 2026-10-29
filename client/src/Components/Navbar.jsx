
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

// Adjust this import to match your Firebase configuration file.
// It should export the Firebase Auth instance as `auth`.
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../FireBase.js"

function Navbar() {
  const { user, loading, setUser } = useUser();
  const navigate = useNavigate();

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Complete sign-out function
  const handleSignOut = async () => {
    try {
      // Sign out from Firebase Google authentication
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Firebase sign-out error:", error);
    } finally {
      // Clear the app's JWT and user state even if Firebase sign-out fails
      localStorage.removeItem("token");
      setUser(null);
      setShowProfile(false);
      setShowCredits(false);

      navigate("/Auth", { replace: true });
    }
  };

  const closeMenus = () => {
    setShowCredits(false);
    setShowProfile(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative z-20 mx-6 mt-6 flex items-center justify-between
        rounded-2xl border border-white/10
        bg-gradient-to-br from-black/90 via-black/80 to-black/90
        px-5 py-4 shadow-[0_22px_55px_rgba(0,0,0,0.75)]
        backdrop-blur-2xl sm:px-8"
    >
      {/* Logo */}
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={() => {
          closeMenus();
          navigate("/Home");
        }}
      >
        <img
          src="/logo.png"
          alt="ExamNotes logo"
          className="h-9 w-9 object-contain"
        />

        <span className="hidden text-lg font-semibold text-white md:block">
          NotesForge<span className="text-gray-400">AI</span>
        </span>
      </div>

      {/* Right-side controls */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Credits dropdown */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => {
              setShowCredits((prev) => !prev);
              setShowProfile(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            aria-expanded={showCredits}
            className="flex items-center gap-2 rounded-full
              border border-white/20 bg-white/10 px-3 py-2
              text-sm text-white shadow-md"
          >
            <span className="text-xl">💎</span>

            <span>
              {loading ? "..." : user ? user.credits : 0}
            </span>

            <motion.span
              animate={{ rotate: showCredits ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex h-5 w-5 items-center justify-center
                rounded-full bg-white text-xs font-bold text-black"
            >
              +
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showCredits && (
              <motion.div
                key="credits-menu"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-full z-50 mt-2
                  w-64 origin-top-right rounded-2xl
                  border border-white/10 bg-black/95 p-4
                  text-white shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                  backdrop-blur-xl"
              >
                <h4 className="mb-2 font-semibold">Buy Credits</h4>

                <p className="mb-4 text-sm text-gray-300">
                  Use credits to generate AI notes, diagrams and PDFs.
                </p>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setShowCredits(false);
                    // Replace this with your actual pricing page route.
                    navigate("/Pricing");
                  }}
                  className="w-full rounded-lg bg-gradient-to-br
                    from-white to-gray-200 py-2 font-semibold
                    text-black hover:opacity-90"
                >
                  Buy More Credits
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile dropdown */}
        <div className="relative">
          <motion.button
            type="button"
            onClick={() => {
              setShowProfile((prev) => !prev);
              setShowCredits(false);
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open profile menu"
            aria-expanded={showProfile}
            className="flex h-10 w-10 items-center justify-center
              rounded-full border border-white/20 bg-white/10
              text-lg font-semibold text-white shadow-md"
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </motion.button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                key="profile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-full z-50 mt-2
                  w-60 origin-top-right rounded-2xl
                  border border-white/10 bg-black/95 p-3
                  shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                  backdrop-blur-xl"
              >
                {/* User information */}
                <div className="mb-2 border-b border-white/10 px-3 py-3">
                  <p className="truncate font-semibold text-white">
                    {user?.name || "User"}
                  </p>

                  <p className="break-all text-xs text-gray-400">
                    {user?.email || ""}
                  </p>
                </div>

                <MenuItem
                  text="Home"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/Home");
                  }}
                />

                <MenuItem
                  text="History"
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/History");
                  }}
                />

                <MenuItem
                  text="Sign out"
                  red
                  onClick={handleSignOut}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

function MenuItem({ onClick, text, red = false }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full rounded-lg px-4 py-3 text-left
        text-sm transition-colors
        ${
          red
            ? "text-red-400 hover:bg-red-500/10"
            : "text-gray-200 hover:bg-white/10"
        }`}
    >
      {text}
    </motion.button>
  );
}

export default Navbar;
