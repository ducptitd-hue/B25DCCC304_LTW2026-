import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => (
  <header className="topbar">
    <div className="nav-inner">
      <NavLink to="/" className="brand">⚡ Nhanh như chớp</NavLink>
      <nav>
        <NavLink to="/" end>Trang chủ</NavLink>
        <NavLink to="/questions">Ngân hàng câu hỏi</NavLink>
        <NavLink to="/history">Lịch sử</NavLink>
      </nav>
    </div>
  </header>
);

export default NavBar;
