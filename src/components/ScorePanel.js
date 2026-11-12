import React from "react";

const ScorePanel = ({ score, correctCount, earned }) => (
  <section className="panel score-panel">
    <div>Điểm: <strong>{score}</strong></div>
    <div>Số câu đúng: <strong>{correctCount}</strong></div>
    {earned > 0 && <div className="earned">+{earned} điểm</div>}
  </section>
);

export default ScorePanel;
