
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Notes from "./Pages/Notes";
import Pricing from "./Pages/Pricing";
import History from "./Pages/History";

import { useUser } from "./context/userContext";
import getcurrentuser from "./Services/api";

function App() {
  const { user, setUser, loading, setLoading } = useUser();

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      setLoading(true);

      try {
        const currentUser = await getcurrentuser();

        if (active) {
          console.log("User received in App:", currentUser);
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);

        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      active = false;
    };
  }, [setUser, setLoading]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading your account...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/Home" : "/Auth"} replace />}
      />

      <Route
        path="/Auth"
        element={user ? <Navigate to="/Home" replace /> : <Auth />}
      />

      <Route
        path="/Home"
        element={user ? <Home /> : <Navigate to="/Auth" replace />}
      />

      <Route
        path="/notes"
        element={user ? <Notes /> : <Navigate to="/Auth" replace />}
      />

      <Route
        path="/pricing"
        element={user ? <Pricing /> : <Navigate to="/Auth" replace />}
      />

      <Route
        path="/history"
        element={user ? <History /> : <Navigate to="/Auth" replace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
