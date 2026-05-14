import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../styles/layout.css"; // ✅ 引入集中管理的 CSS

function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* 這裡會渲染各頁內容 */}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
