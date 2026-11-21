// Pure game logic for Tic-Tac-Toe, kept separate from the UI so it stays
// easy to test and reason about.

export type Player = "X" | "O";
export type CellValue = Player | null;
export type Board = CellValue[];

export interface WinInfo {
  winner: Player;
  line: number[]; // the three winning cell indexes, used for the highlight
}

// Every possible winning line on a 3x3 board.
const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/** Returns the winner and winning line, or null when nobody has won yet. */
export function calculateWinner(board: Board): WinInfo | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    const value = board[a];
    if (value && value === board[b] && value === board[c]) {
      return { winner: value, line };
    }
  }
  return null;
}

/** A draw is a full board with no winner. */
export function isDraw(board: Board): boolean {
  return board.every(Boolean) && !calculateWinner(board);
}
