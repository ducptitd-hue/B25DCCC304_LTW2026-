import React from "react";

const AnswerButton = ({ letter, answer, onClick, disabled, state, focused }) => {
  const classNames = ["answer-btn", state || "", focused ? "focused" : ""].join(" ");
  return (
    <button type="button" className={classNames} onClick={onClick} disabled={disabled}>
      <strong>{letter}.</strong> {answer}
    </button>
  );
};

export default AnswerButton;
