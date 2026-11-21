import type { CellValue } from "../lib/game";

interface SquareProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
}

// One cell of the board. X is the Tiger, O is the Fox.
export default function Square({ value, onClick, isWinning }: SquareProps) {
  const classes = ["square"];
  if (value === "X") classes.push("x");
  if (value === "O") classes.push("o");
  if (isWinning) classes.push("win");

  return (
    <button
      type="button"
      className={classes.join(" ")}
      onClick={onClick}
      disabled={value !== null}
      aria-label={value ? `Taken by ${value}` : "Empty square"}
    >
      {value === "X" ? "🐯" : value === "O" ? "🦊" : ""}
    </button>
  );
}
