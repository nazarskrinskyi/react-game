import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../store";
import { RootState } from "../store/store";
import colorDeclare from "../utils/ColorDeclare";

const Board: React.FC = () => {
  const board = useSelector((state: RootState) => state.game.board);
  const target = useSelector((state: RootState) => state.settings.target);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("userName");
    if (!username) {
      navigate("/start");
    }
  }, [navigate]);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        🎯 Target: {target}
      </h2>
      <div
        className="game-board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
          gap: "5px",
          width: `${board[0].length * 70}px`,
          margin: "0 auto",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const bgColor = colorDeclare(cell);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="square"
                style={{
                  backgroundColor: bgColor,
                  color: cell > 0 ? "#fff" : "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60px",
                  height: "60px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {cell !== 0 ? cell : ""}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Board;
