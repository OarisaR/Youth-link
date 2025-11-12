import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import "./UserPanel.css";

export default function UserLayout() {
  return (
    <div className="user-layout">
      <UserNavbar />
      <div className="user-content">
        <Outlet />
      </div>
    </div>
  );
}
