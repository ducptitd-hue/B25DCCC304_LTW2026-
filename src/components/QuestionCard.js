import React from "react";
import AnswerButton from "./AnswerButton";

const QuestionCard = ({ question, index, onAnswer, disabled, chosen, focusedIndex, revealed }) => {
  const letters = ["A", "B", "C", "D"];
  return (
    <section className="panel question-panel">
      <div className="eyebrow">Câu {index + 1}/15 · {question.level}</div>
      <h2>{question.question}</h2>
      <div className="answer-grid">
        {question.answers.map((answer, i) => {
          let state = "";
          if (revealed && letters[i] === question.correct) state = "correct";
          else if (revealed && letters[i] === chosen) state = "wrong";
          return (
            <AnswerButton
              key={`${question.id}-${letters[i]}`}
              letter={letters[i]}
              answer={answer}
              onClick={() => onAnswer(letters[i])}
              disabled={disabled}
              state={state}
              focused={focusedIndex === i && !revealed}
            />
          );
        })}
      </div>
    </section>
  );
};

export default QuestionCard;
