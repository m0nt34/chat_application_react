import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
const Layout = () => {
  return (
    <main className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex items-center justify-center min-h-screen w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
