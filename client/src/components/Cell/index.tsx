'use client';

import { useMemo } from 'react';

import CBoard from '@/lib/board';

import Piece from '@/components/Piece';

import styles from './cell.module.css';

interface CellProps {
  position: number;
  pieceNotation: string | null;
}

function Cell({ position, pieceNotation }: CellProps) {
  const col = useMemo(() => CBoard.getColumnIndex(position), [position]);
  const row = useMemo(() => CBoard.getRowIndex(position), [position]);
  const bgColor = useMemo(
    () => ((col + row) & 1 ? styles['square-black'] : styles['square-white']),
    [col, row]
  );
  return (
    <div className={`${styles['chess-square']} ${bgColor}`}>
      {pieceNotation && <Piece pieceNotation={pieceNotation} />}
    </div>
  );
}

export default Cell;
