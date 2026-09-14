import { useMemo, useState } from 'react';

import { CBoard, CCell, ValidMoves } from '@chess/domain';

import Cell from '@/components/Cell';

import styles from './board.module.css';

function Board() {
  const [board, setBoard] = useState<CCell[]>(CBoard.initialBoard());
  const validMoves: Map<string, number[]> = useMemo(() => {
    ValidMoves.initialize();
    return ValidMoves.table;
  }, []);

  return (
    <section className={`${styles['chess-board']}`}>
      {board.map((cell, idx) => (
        <Cell position={cell.Position} pieceNotation={cell.getPieceNotation()} key={idx} />
      ))}
    </section>
  );
}

export default Board;
