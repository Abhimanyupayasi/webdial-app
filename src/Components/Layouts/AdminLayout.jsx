import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminLayout() {
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.labels ? user.labels[0] : null;

  // Check if user exists and has the 'admin' label
  if(!isAdmin || isAdmin !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      
      <Outlet />
    </div>
  );
}

export default AdminLayout;
