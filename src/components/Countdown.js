import React from "react";

const Countdown = ({ value }) => (
  <div className="countdown-screen" aria-live="polite">
    <div className="countdown-number">{value}</div>
    <p>Chuẩn bị nhé!</p>
  </div>
);

export default Countdown;
