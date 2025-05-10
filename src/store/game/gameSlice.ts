import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GameState = {
  board: number[][];
  score: number;
};

const generateEmptyBoard = (size: number): number[][] =>
  Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

const addRandomTile = (board: number[][]): number[][] => {
  let emptyCells: { x: number; y: number }[] = [];
  board.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === 0) emptyCells.push({ x, y });
    }),
  );

  if (emptyCells.length === 0) return board;

  const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[y][x] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

const moveTiles = (
  board: number[][],
  direction: string,
): [number[][], number] => {
  let newBoard = [...board.map((row) => [...row])];
  let scoreGained = 0;

  const slide = (row: number[]) => {
    let arr = row.filter((num) => num !== 0);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        scoreGained += arr[i];
        arr.splice(i + 1, 1);
      }
    }
    while (arr.length < row.length) arr.push(0);
    return arr;
  };

  if (direction === "left") newBoard = newBoard.map((row) => slide(row));
  if (direction === "right")
    newBoard = newBoard.map((row) => slide(row.reverse()).reverse());
  if (direction === "up") {
    for (let x = 0; x < newBoard.length; x++) {
      let col = slide(newBoard.map((row) => row[x]));
      for (let y = 0; y < newBoard.length; y++) newBoard[y][x] = col[y];
    }
  }
  if (direction === "down") {
    for (let x = 0; x < newBoard.length; x++) {
      let col = slide(newBoard.map((row) => row[x]).reverse()).reverse();
      for (let y = 0; y < newBoard.length; y++) newBoard[y][x] = col[y];
    }
  }

  return [newBoard, scoreGained];
};

const initialState: GameState = {
  board: addRandomTile(addRandomTile(generateEmptyBoard(4))), // default to 4 initially
  score: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    move: (state, action: PayloadAction<"up" | "down" | "left" | "right">) => {
      const [newBoard, scoreGained] = moveTiles(state.board, action.payload);
      state.board = addRandomTile(newBoard);
      state.score += scoreGained;
    },
    restart: (state, action: PayloadAction<number>) => {
      const size = action.payload;
      state.board = addRandomTile(addRandomTile(generateEmptyBoard(size))); // generate the board of the correct size
      state.score = 0;
    },
  },
});

export const { reducer, actions } = gameSlice;
