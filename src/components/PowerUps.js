import React from "react";

const PowerUps = ({ used, status, onChangeQuestion, onDouble, onStopTime, doubled }) => (
  <div className="powerups">
    <button disabled={status !== "answering" || used.change} onClick={onChangeQuestion}>Đổi câu hỏi</button>
    <button disabled={status !== "answering" || used.double} onClick={onDouble}>
      {doubled ? "Đang nhân đôi" : "Nhân đôi"}
    </button>
    <button disabled={status !== "answering" || used.stop} onClick={onStopTime}>Dừng giờ</button>
  </div>
);

export default PowerUps;
