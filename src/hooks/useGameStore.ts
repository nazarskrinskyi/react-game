import { create } from "zustand";

type GameState = {
    board: number[][];
    score: number;
    move: (direction: "up" | "down" | "left" | "right") => void;
    restart: () => void;
};

const emptyBoard = (): number[][] => Array(5).fill(0).map(() => Array(5).fill(0));

const addRandomTile = (board: number[][]): number[][] => {
    let emptyCells: { x: number; y: number }[] = [];
    board.forEach((row, y) =>
        row.forEach((cell, x) => {
            if (cell === 0) emptyCells.push({ x, y });
        })
    );

    if (emptyCells.length === 0) return board;

    const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[y][x] = Math.random() < 0.9 ? 2 : 4;
    return board;
};

const moveTiles = (board: number[][], direction: string): [number[][], number] => {
    let newBoard = [...board.map(row => [...row])];
    let scoreGained = 0;

    const slide = (row: number[]) => {
        let arr = row.filter(num => num !== 0); // Прибираємо нулі
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                scoreGained += arr[i];
                arr.splice(i + 1, 1);
            }
        }
        while (arr.length < 4) arr.push(0);
        return arr;
    };

    if (direction === "left") newBoard = newBoard.map(row => slide(row));
    if (direction === "right") newBoard = newBoard.map(row => slide(row.reverse()).reverse());
    if (direction === "up") {
        for (let x = 0; x < 4; x++) {
            let col = slide(newBoard.map(row => row[x]));
            for (let y = 0; y < 4; y++) newBoard[y][x] = col[y];
        }
    }
    if (direction === "down") {
        for (let x = 0; x < 4; x++) {
            let col = slide(newBoard.map(row => row[x]).reverse()).reverse();
            for (let y = 0; y < 4; y++) newBoard[y][x] = col[y];
        }
    }

    return [newBoard, scoreGained];
};

export const useGameStore = create<GameState>((set) => ({
    board: addRandomTile(addRandomTile(emptyBoard())),
    score: 0,
    move: (direction) =>
        set((state) => {
            const [newBoard, scoreGained] = moveTiles(state.board, direction);
            return {
                board: addRandomTile(newBoard),
                score: state.score + scoreGained,
            };
        }),
    restart: () => set({ board: addRandomTile(addRandomTile(emptyBoard())), score: 0 }),
}));
