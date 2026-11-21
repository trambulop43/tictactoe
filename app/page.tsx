"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Board from "../components/Board";
import Scoreboard from "../components/Scoreboard";
import {
  calculateWinner,
  isDraw,
  type Board as BoardState,
  type Player,
} from "../lib/game";

const EMPTY_BOARD: BoardState = Array(9).fill(null);
const SCORE_KEY = "tictactoe-score-v1";

interface Score {
  xWins: number;
  oWins: number;
  draws: number;
}

const EMPTY_SCORE: Score = { xWins: 0, oWins: 0, draws: 0 };

// Small confetti burst rendered when someone wins.
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 2.2 + Math.random() * 1.6,
        glyph: ["🎉", "✨", "⭐", "🐯", "🦊"][i % 5],
      })),
    []
  );

  return (
    <>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}vw`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.glyph}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  const [board, setBoard] = useState<BoardState>(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState<Score>(EMPTY_SCORE);

  // Load the saved score once on mount (localStorage is browser-only).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SCORE_KEY);
      if (saved) setScore({ ...EMPTY_SCORE, ...JSON.parse(saved) });
    } catch {
      // A broken or blocked localStorage should never break the game.
    }
  }, []);

  const win = calculateWinner(board);
  const draw = !win && isDraw(board);
  const roundOver = Boolean(win) || draw;

  // Record the result once per finished round.
  useEffect(() => {
    if (!roundOver) return;
    setScore((prev) => {
      const next = win
        ? win.winner === "X"
          ? { ...prev, xWins: prev.xWins + 1 }
          : { ...prev, oWins: prev.oWins + 1 }
        : { ...prev, draws: prev.draws + 1 };
      try {
        window.localStorage.setItem(SCORE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage failures; the scoreboard still works in-memory.
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundOver]);

  const handlePlay = useCallback(
    (index: number) => {
      if (board[index] || win) return;
      const next = board.slice();
      next[index] = (xIsNext ? "X" : "O") as Player;
      setBoard(next);
      setXIsNext(!xIsNext);
    },
    [board, win, xIsNext]
  );

  const resetBoard = useCallback(() => {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
  }, []);

  let status: React.ReactNode;
  if (win) {
    status = (
      <>
        {win.winner === "X" ? "🐯 Tiger" : "🦊 Fox"} takes the round!
      </>
    );
  } else if (draw) {
    status = <>A draw - nobody blinks.</>;
  } else {
    status = <>{xIsNext ? "🐯 Tiger" : "🦊 Fox"} to move</>;
  }

  return (
    <main className="page">
      {win && <Confetti />}
      <h1 className="title">
        <span className="tiger">Tiger</span> vs <span className="fox">Fox</span>
      </h1>
      <p className="subtitle">
        Classic Tic-Tac-Toe, neon-arcade edition. Two players, one device.
      </p>
      <div className="status" role="status" aria-live="polite">
        {status}
      </div>
      <Board
        board={board}
        winningLine={win ? win.line : []}
        onPlay={handlePlay}
      />
      <button type="button" className="new-game" onClick={resetBoard}>
        New Game
      </button>
      <Scoreboard xWins={score.xWins} oWins={score.oWins} draws={score.draws} />
      <p className="footer">
        Built with React + Next.js - Tiger 🐯 vs Fox 🦊
      </p>
    </main>
  );
}
