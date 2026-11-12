import React from "react";

const TimeBar = ({ timeLeft, stopped }) => {
  const percent = Math.max(0, (timeLeft / 15) * 100);
  return (
    <section className="panel time-panel">
      <div className="time-label">Còn {timeLeft} giây{stopped ? " (đã dừng)" : ""}</div>
      <div className="time-track">
        <div
          className={`time-fill ${timeLeft <= 5 ? "danger" : ""}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
};

export default TimeBar;
