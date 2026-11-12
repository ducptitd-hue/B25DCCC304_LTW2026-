import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ playerName, setPlayerName, bestRecord }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleKeywordShift = (event) => setKeyword(event.target.value);
  const validName = playerName.trim().length > 0;

  return (
    <div className="home-layout">
      <section className="hero panel">
        <div className="hero-icon">⚡</div>
        <p className="eyebrow">THỬ THÁCH KIẾN THỨC REACT</p>
        <h1>Nhanh như chớp</h1>
        <p className="lead">15 câu hỏi · 15 giây mỗi câu · Trả lời càng nhanh, điểm càng cao!</p>
        <div className="rules">
          <h3>Luật chơi</h3>
          <ul>
            <li>Mỗi lượt có 15 câu hỏi, mỗi câu tối đa 15 giây.</li>
            <li>Đúng được điểm theo độ khó và số giây còn lại.</li>
            <li>Sai hoặc hết giờ vẫn tiếp tục câu tiếp theo.</li>
            <li>Bạn có 3 quyền trợ giúp, mỗi quyền dùng một lần.</li>
          </ul>
        </div>
        <label className="field-label" htmlFor="player">Tên người chơi</label>
        <input id="player" className="text-input" value={playerName}
          onChange={(event) => setPlayerName(event.target.value)} placeholder="Nhập tên của bạn..." />
        <button className="primary-btn start-btn" disabled={!validName} onClick={() => navigate("/play")}>
          Bắt đầu chơi <span>→</span>
        </button>
        {bestRecord && <p className="record">🏆 Kỷ lục: {bestRecord.score} điểm – {bestRecord.name}</p>}
      </section>
    </div>
  );
};

export default Home;
