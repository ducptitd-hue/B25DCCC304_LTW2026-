import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => <section className="panel empty-state"><h1>404 · Không tìm thấy trang</h1><Link to="/">Về trang chủ</Link></section>;
export default NotFound;
