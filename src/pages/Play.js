import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";
import QuestionCard from "../components/QuestionCard";
import TimeBar from "../components/TimeBar";
import ScorePanel from "../components/ScorePanel";
import PowerUps from "../components/PowerUps";
import { calcPoints, calcTotal, getStars } from "../utils";
import { ANSWER_KEYS } from "../data";

const Play = ({ questions, playerName, onFinish }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("countdown");
  const [countdown, setCountdown] = useState(3);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [earned, setEarned] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [used, setUsed] = useState({ change: false, double: false, stop: false });
  const [doubled, setDoubled] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionLabel, setQuestionLabel] = useState("");
  const [runQuestions] = useState(() => [...questions].sort((a, b) => a.id - b.id).slice(0, 15));

  const correctCount = useMemo(() => answers.filter((item) => item.correct).length, [answers]);
  const score = useMemo(() => calcTotal(answers), [answers]);

  useEffect(() => {
    if (status !== "countdown") return undefined;
    if (countdown === 0) {
      setCurrentQuestion(runQuestions[0]);
      setQuestionLabel("");
      setTimeLeft(15);
      setFocusedIndex(0);
      setStatus("answering");
      return undefined;
    }
    const timer = setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, countdown, runQuestions]);

  useEffect(() => {
    if (status !== "answering" || stopped) return undefined;
    const timer = setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status, questionIndex, stopped]);

  useEffect(() => {
    if (status === "answering" && timeLeft === 0) revealAnswer(null);
  }, [timeLeft, status]);

  useEffect(() => {
    if (status !== "revealed") return undefined;
    const timer = setTimeout(() => {
      if (questionIndex === 14) {
        const finalAnswers = answers;
        const finalCorrect = finalAnswers.filter((item) => item.correct).length;
        const finalScore = calcTotal(finalAnswers);
        const rank = getStars(finalCorrect);
        onFinish({
          name: playerName,
          answers: finalAnswers,
          score: finalScore,
          correctCount: finalCorrect,
          stars: rank.stars,
          message: rank.message
        });
      } else {
        const nextIndex = questionIndex + 1;
        setQuestionIndex(nextIndex);
        setCurrentQuestion(runQuestions[nextIndex]);
        setQuestionLabel("");
        setChosen(null);
        setEarned(0);
        setDoubled(false);
        setStopped(false);
        setTimeLeft(15);
        setFocusedIndex(0);
        setStatus("answering");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [status, questionIndex, answers, runQuestions, onFinish, playerName]);

  useEffect(() => {
    if (status === "answering") {
      document.title = `Câu ${questionIndex + 1}/15 – đúng ${correctCount} câu`;
    }
    return () => { document.title = "Nhanh như chớp"; };
  }, [status, questionIndex, correctCount]);

  const revealAnswer = (letter) => {
    if (status !== "answering" || !currentQuestion) return;
    const isCorrect = letter === currentQuestion.correct;
    const points = isCorrect ? calcPoints(currentQuestion, timeLeft, doubled) : 0;
    const record = {
      id: currentQuestion.id,
      chosen: letter,
      correct: isCorrect,
      correctAnswer: currentQuestion.correct,
      timeLeft,
      points,
      questionText: currentQuestion.question,
      level: currentQuestion.level,
      label: questionLabel
    };
    setAnswers((old) => [...old, record]);
    setChosen(letter);
    setEarned(points);
    setStatus("revealed");
  };

  useEffect(() => {
    const handleKey = (event) => {
      if (status !== "answering") return;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowLeft" && focusedIndex % 2 === 1) setFocusedIndex((v) => v - 1);
      if (event.key === "ArrowRight" && focusedIndex % 2 === 0) setFocusedIndex((v) => v + 1);
      if (event.key === "ArrowUp" && focusedIndex >= 2) setFocusedIndex((v) => v - 2);
      if (event.key === "ArrowDown" && focusedIndex < 2) setFocusedIndex((v) => v + 2);
      if (event.key === "Enter") revealAnswer(ANSWER_KEYS[focusedIndex]);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, focusedIndex, currentQuestion, timeLeft, doubled, questionLabel]);

  const changeQuestion = () => {
    const replacement = questions.find((item) =>
      item.level === currentQuestion.level && !runQuestions.some((q) => q.id === item.id)
    );
    if (!replacement) return;
    setUsed((old) => ({ ...old, change: true }));
    setQuestionLabel(` (đổi sang câu ${replacement.id})`);
    setCurrentQuestion(replacement);
    setTimeLeft(15);
  };

  const useDouble = () => {
    setUsed((old) => ({ ...old, double: true }));
    setDoubled(true);
  };

  const stopTime = () => {
    setUsed((old) => ({ ...old, stop: true }));
    setStopped(true);
  };

  if (status === "countdown") return <Countdown value={countdown} />;
  if (!currentQuestion) return <p className="notice">Đang chuẩn bị câu hỏi...</p>;

  const displayQuestion = questionLabel
    ? { ...currentQuestion, question: currentQuestion.question }
    : currentQuestion;

  return (
    <div className="play-layout">
      <div className="play-heading">
        <div><span className="eyebrow">NGƯỜI CHƠI</span><h1>{playerName}</h1></div>
        <div className="progress-pill">Câu {questionIndex + 1} / 15</div>
      </div>
      <div className="play-columns">
        <div>
          <QuestionCard question={displayQuestion} index={questionIndex} onAnswer={revealAnswer}
            disabled={status !== "answering"} chosen={chosen} focusedIndex={focusedIndex}
            revealed={status === "revealed"} />
          <TimeBar timeLeft={timeLeft} stopped={stopped} />
          <PowerUps used={used} status={status} onChangeQuestion={changeQuestion}
            onDouble={useDouble} onStopTime={stopTime} doubled={doubled} />
        </div>
        <ScorePanel score={score} correctCount={correctCount} earned={earned} />
      </div>
      {status === "revealed" && (
        <div className={`feedback ${chosen === currentQuestion.correct ? "feedback-good" : "feedback-bad"}`}>
          {chosen === null ? "Hết giờ!" : chosen === currentQuestion.correct ? "Chính xác!" : "Chưa chính xác!"}
          <span> Đáp án đúng: {currentQuestion.correct}</span>
        </div>
      )}
    </div>
  );
};

export default Play;
