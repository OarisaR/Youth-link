import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ✅ User routes wrapped under layout */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Dashboard />} /> {/* default */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
