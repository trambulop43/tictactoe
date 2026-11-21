# Tiger vs Fox - Tic-Tac-Toe

A neon-arcade Tic-Tac-Toe built with **React 18 + Next.js 14 (App Router) + TypeScript**.

Two players share one device: 🐯 Tiger plays X, 🦊 Fox plays O. The game calls
the winner (or the draw), highlights the winning line, throws a little
confetti, and keeps a running scoreboard that survives a refresh.

## Features

- Two-player turns on a 3x3 board
- Winner and draw detection with the winning line highlighted
- **New Game** button resets the board
- Scoreboard (Tiger wins / Fox wins / draws) persisted in `localStorage`
- Mobile-friendly layout
- Game logic kept pure in `lib/game.ts`, separate from the UI

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Project layout

```
app/page.tsx          game screen (state, turns, status, confetti)
app/globals.css       neon-arcade theme
components/Board.tsx  the 3x3 grid
components/Square.tsx one cell
components/Scoreboard.tsx
lib/game.ts           pure winner/draw logic
```

## Live demo

Deployed on Vercel: https://tictactoe-trambulop43.vercel.app
