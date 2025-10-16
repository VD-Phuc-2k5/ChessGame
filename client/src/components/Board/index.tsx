import { useState } from "react";
import CCell from "@/lib/cell";
import CBoard from "@/lib/board";
import Cell from "@/components/Cell";
import styles from "./board.module.css";

function Board() {
  const [board, setBoard] = useState<CCell[]>(CBoard.initialBoard());

  return (
    <section className={`${styles["chess-board"]}`}>
      {board.map((cell, idx) => (
        <Cell
          position={cell.Position}
          pieceNotation={cell.getPieceNotation()}
          key={idx}
        />
      ))}
    </section>
  );
}

export default Board;
