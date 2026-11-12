import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const QuestionBank = ({ questions }) => {
  const [keyword, setKeyword] = useState("");
  const [level, setLevel] = useState("Tất cả");
  const handleKeywordShift = (event) => setKeyword(event.target.value);
  const filtered = useMemo(() => questions.filter((item) => {
    const matchKeyword = `${item.question} ${item.answers.join(" ")}`.toLowerCase().includes(keyword.toLowerCase());
    return matchKeyword && (level === "Tất cả" || item.level === level);
  }), [questions, keyword, level]);

  return (
    <section className="panel">
      <p className="eyebrow">DỮ LIỆU TRÒ CHƠI</p><h1>Ngân hàng câu hỏi</h1>
      <div className="filter-row">
        <input className="text-input" value={keyword} onChange={handleKeywordShift} placeholder="Tìm câu hỏi..." />
        <select className="text-input" value={level} onChange={(event) => setLevel(event.target.value)}>
          <option>Tất cả</option><option>Dễ</option><option>Trung bình</option><option>Khó</option>
        </select>
      </div>
      <div className="question-list">
        {filtered.map((item) => <Link className="question-list-item" key={item.id} to={`/questions/${item.id}`}>
          <span>Câu {item.id} · {item.level}</span><strong>{item.question}</strong>
        </Link>)}
        {filtered.length === 0 && <p>Không tìm thấy câu hỏi phù hợp.</p>}
      </div>
    </section>
  );
};

export default QuestionBank;
