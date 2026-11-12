const BUILD_TAG = "nc-7438";

import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Result from "./pages/Result";
import History from "./pages/History";
import QuestionBank from "./pages/QuestionBank";
import QuestionDetail from "./pages/QuestionDetail";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import { HISTORY_KEY } from "./data";
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/data/questions.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Không tải được ngân hàng câu hỏi.");
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message || "Có lỗi khi tải câu hỏi.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addHistory = (record) => setHistory((old) => [...old, record]);
  const deleteHistory = (id) => setHistory((old) => old.filter((item) => item.id !== id));
  const clearHistory = () => setHistory([]);

  const bestRecord = useMemo(
    () => [...history].sort((a, b) => b.score - a.score || b.correctCount - a.correctCount)[0],
    [history]
  );

  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={
            <Home playerName={playerName} setPlayerName={setPlayerName} bestRecord={bestRecord} />
          } />
          <Route path="/play" element={
            !playerName.trim()
              ? <Navigate to="/" replace />
              : loading
                ? <p className="notice">Đang tải câu hỏi...</p>
                : error
                  ? <p className="error">{error}</p>
                  : questions.length < 15
                    ? <p className="error">Ngân hàng cần có ít nhất 15 câu hỏi.</p>
                    : <Play questions={questions} playerName={playerName} onFinish={(result) => {
                        addHistory({
                          id: Date.now(),
                          name: result.name,
                          score: result.score,
                          correctCount: result.correctCount,
                          stars: result.stars,
                          playedAt: new Date().toLocaleString("vi-VN")
                        });
                        navigate("/result", { replace: true, state: result });
                      }} />
          } />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={
            <History history={history} onDelete={deleteHistory} onClear={clearHistory} />
          } />
          <Route path="/questions" element={<QuestionBank questions={questions} />} />
          <Route path="/questions/:id" element={<QuestionDetail questions={questions} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">Nhanh như chớp · React Hooks · {BUILD_TAG}</footer>
    </>
  );
};

export default App;
