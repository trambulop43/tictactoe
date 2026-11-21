interface ScoreboardProps {
  xWins: number;
  oWins: number;
  draws: number;
}

// Running score across rounds, kept in localStorage by the page.
export default function Scoreboard({ xWins, oWins, draws }: ScoreboardProps) {
  return (
    <div className="scoreboard" aria-label="Scoreboard">
      <div className="score">
        <span className="label">🐯 Tiger</span>
        <span className="value">{xWins}</span>
      </div>
      <div className="score">
        <span className="label">Draws</span>
        <span className="value">{draws}</span>
      </div>
      <div className="score">
        <span className="label">Fox 🦊</span>
        <span className="value">{oWins}</span>
      </div>
    </div>
  );
}
