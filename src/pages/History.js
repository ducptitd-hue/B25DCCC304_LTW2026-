import React, { useMemo } from "react";
import { starText } from "../utils";

const History = ({ history, onDelete, onClear }) => {
  const sorted = useMemo(() => [...history].sort(
    (a, b) => b.score - a.score || b.correctCount - a.correctCount
  ), [history]);
  const stats = useMemo(() => {
    const totalScore = history.reduce((sum, item) => sum + item.score, 0);
    const totalCorrect = history.reduce((sum, item) => sum + item.correctCount, 0);
    return {
      count: history.length,
      average: history.length ? Math.round(totalScore / history.length) : 0,
      rate: history.length ? Math.round((totalCorrect / (15 * history.length)) * 100) : 0
    };
  }, [history]);

  return (
    <section className="panel history-panel">
      <div className="section-heading"><div><p className="eyebrow">THÀNH TÍCH</p><h1>Lịch sử chơi</h1></div>
        {history.length > 0 && <button className="danger-btn" onClick={onClear}>Xóa lịch sử</button>}
      </div>
      <div className="stats-grid">
        <div className="stat-card"><span>Số lượt chơi</span><strong>{stats.count}</strong></div>
        <div className="stat-card"><span>Điểm trung bình</span><strong>{stats.average}</strong></div>
        <div className="stat-card"><span>Tỉ lệ trả lời đúng</span><strong>{stats.rate}%</strong></div>
      </div>
      {history.length === 0 ? <div className="empty-state">Chưa có lượt chơi nào.</div> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Người chơi</th><th>Số câu đúng</th><th>Xếp loại</th><th>Điểm</th><th>Thời gian</th><th>Thao tác</th></tr></thead>
            <tbody>
              {sorted.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td><td>{item.correctCount}/15</td><td>{starText(item.stars)}</td>
                  <td><strong>{item.score}</strong></td><td>{item.playedAt}</td>
                  <td><button className="small-delete" onClick={() => onDelete(item.id)}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default History;
