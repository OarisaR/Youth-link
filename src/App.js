import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserLayout from "./pages/user/UserLayout.jsx";
import Dashboard from "./pages/user/Dashboard";
import Jobs from "./pages/user/Jobs";
import Resources from "./pages/user/Resources";
import Profile from "./pages/user/Profile";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loading state added
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // done checking auth
    });
    return () => unsubscribe();
  }, [auth]);

  // Show a loading indicator while checking auth
  // Show a loading indicator while checking auth
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
          backgroundColor: "#f9f9f9",
        }}
      >
        Loading...
      </div>
    );

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainPage />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/user/dashboard" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/user/dashboard" /> : <SignUp />}
        />

        {/* Protected user routes */}
        <Route
          path="/user"
          element={user ? <UserLayout /> : <Navigate to="/" />}
        >
          <Route index element={<Dashboard user={user} />} />
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="jobs" element={<Jobs user={user} />} />
          <Route path="resources" element={<Resources user={user} />} />
          <Route path="profile" element={<Profile user={user} />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
