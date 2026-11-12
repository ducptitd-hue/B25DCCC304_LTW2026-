import React from "react";
import { Link, useParams } from "react-router-dom";

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const question = questions.find((item) => item.id === Number(id));
  if (!question) return <section className="panel"><h1>Không tìm thấy câu hỏi</h1><Link to="/questions">Quay lại ngân hàng</Link></section>;
  return (
    <section className="panel">
      <p className="eyebrow">CÂU {question.id} · {question.level}</p>
      <h1>{question.question}</h1>
      <ol type="A">{question.answers.map((answer) => <li key={answer}>{answer}</li>)}</ol>
      <p className="answer-key">Đáp án đúng: {question.correct}</p>
      <Link to="/questions">← Quay lại ngân hàng</Link>
    </section>
  );
};

export default QuestionDetail;
