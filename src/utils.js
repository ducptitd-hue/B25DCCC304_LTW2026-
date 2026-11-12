export const POINTS = { "Dễ": 50, "Trung bình": 100, "Khó": 150 };
export const BONUS_PER_SECOND = 10;
export const STARS = [
  { min: 12, stars: 3, message: "Xuất sắc! Bạn nhanh như chớp" },
  { min: 8, stars: 2, message: "Làm tốt lắm!" },
  { min: 0, stars: 1, message: "Cố gắng thêm nhé!" }
];

export const calcPoints = (question, timeLeft, doubled = false) => {
  if (!question || timeLeft <= 0) return 0;
  const score = (POINTS[question.level] || 0) + timeLeft * BONUS_PER_SECOND;
  return doubled ? score * 2 : score;
};

export const calcTotal = (answers) =>
  answers.reduce((total, answer) => total + (answer.points || 0), 0);

export const getStars = (correctCount) =>
  STARS.find((item) => correctCount >= item.min) || STARS[STARS.length - 1];

export const starText = (count) => "★".repeat(count) + "☆".repeat(3 - count);
