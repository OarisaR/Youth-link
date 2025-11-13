import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./UserPanel.css";

export default function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="user-navbar">
      <img src="/assets/logo.png" alt="YouthLink" className="navbar-logo" />
      
      <div className="navbar-links">
        <NavLink to="/user/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Dashboard
        </NavLink>
        <NavLink to="/user/jobs" className={({ isActive }) => (isActive ? "active" : "")}>
          Jobs
        </NavLink>
        <NavLink to="/user/resources" className={({ isActive }) => (isActive ? "active" : "")}>
          Resources
        </NavLink>
        <NavLink to="/user/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}