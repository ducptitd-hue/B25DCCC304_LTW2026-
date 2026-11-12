import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { starText } from "../utils";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state || !Array.isArray(state.answers)) return <Navigate to="/" replace />;

  return (
    <section className="panel result-panel">
      <div className="result-icon">🏆</div>
      <p className="eyebrow">KẾT QUẢ LƯỢT CHƠI</p>
      <h1>{state.message}</h1>
      <div className="result-stars">{starText(state.stars)}</div>
      <div className="result-summary">
        <p>Người chơi: <strong>{state.name}</strong></p>
        <p>Số câu trả lời đúng: <strong>{state.correctCount}/15</strong></p>
        <p>Điểm: <strong>{state.score}</strong></p>
        <p>Xếp loại: <strong>{state.stars} sao</strong></p>
      </div>
      <h2>Xem lại 15 câu</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Câu</th><th>Bạn chọn</th><th>Đáp án đúng</th><th>Còn lại</th><th>Điểm</th></tr></thead>
          <tbody>
            {state.answers.map((item, index) => (
              <tr key={`${item.id}-${index}`} className={item.correct ? "row-correct" : "row-wrong"}>
                <td>{index + 1}{item.label || ""}</td>
                <td>{item.chosen || "—"}</td>
                <td>{item.correctAnswer}</td>
                <td>{item.timeLeft} giây</td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="result-actions">
        <button className="primary-btn" onClick={() => navigate("/play", { replace: true })}>Chơi lại</button>
        <button className="secondary-btn" onClick={() => navigate("/", { replace: true })}>Về trang chủ</button>
      </div>
    </section>
  );
};

export default Result;
