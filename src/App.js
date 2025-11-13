import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/signin"
          element={user ? <Navigate to="/user/dashboard" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/user/dashboard" /> : <SignUp />}
        />

        {/*  User routes wrapped under layout with protected access */}
        <Route
          path="/user"
          element={user ? <UserLayout /> : <Navigate to="/signin" />}
        >
          <Route index element={<Dashboard user={user} />} />
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="jobs" element={<Jobs user={user} />} />
          <Route path="resources" element={<Resources user={user} />} />
          <Route path="profile" element={<Profile user={user} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
