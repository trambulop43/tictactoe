import type { Board as BoardState } from "../lib/game";
import Square from "./Square";

interface BoardProps {
  board: BoardState;
  winningLine: number[];
  onPlay: (index: number) => void;
}

// The 3x3 grid. Clicking an empty square plays the current player's mark.
export default function Board({ board, winningLine, onPlay }: BoardProps) {
  return (
    <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          isWinning={winningLine.includes(index)}
          onClick={() => onPlay(index)}
        />
      ))}
    </div>
  );
}
