'use client';

import { useBoard } from '@/context/BoardContext';
import { ICell } from '@chess/core';
import { JSX } from 'react/jsx-dev-runtime';

import CellComponent from './cell';

function BoardGrid(): JSX.Element {
  const {
    cells,
    size,
    selected,
    legalTargets,
    lastIllegal,
    isGameOver,
    onSelectCell,
    onDragStart,
    onDragEnd,
    onDrop,
  } = useBoard();

  return (
    <div style={{ width: size, height: size }} className="board-grid grid grid-cols-8 border-4">
      {cells.map((cell: ICell): JSX.Element => {
        const position = cell.getPosition();
        const coordinate = position.toString();
        const hasPiece: boolean = cell.getPiece() !== null;
        const isSelected: boolean = selected === coordinate;
        const isTarget: boolean = legalTargets.includes(coordinate);
        const isIllegal: boolean = lastIllegal === coordinate;

        return (
          <div
            key={coordinate}
            className={`relative grid aspect-square h-full w-full place-items-center ${
              isSelected ? 'cursor-pointer ring-4 ring-yellow-400 ring-inset' : ''
            }`}
            onClick={() => {
              if (!isGameOver) onSelectCell(position);
            }}
            draggable={hasPiece && !isGameOver}
            onDragStart={(event) => {
              event.dataTransfer.setData('text/plain', coordinate);
              if (!isGameOver) onDragStart(position);
            }}
            onDragEnd={() => onDragEnd()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              if (!isGameOver) onDrop(position);
            }}
          >
            <CellComponent
              color={cell.getColor()}
              coordinate={coordinate}
              piece={cell.getPiece()}
            />

            {isTarget && (
              <span className="legal-move-overlay pointer-events-none absolute inset-0 bg-yellow-400/30">
                <span className="legal-move-dot absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white opacity-80" />
              </span>
            )}
            {isIllegal && (
              <span className="pointer-events-none absolute inset-0 animate-pulse bg-red-500/70" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { BoardGrid };
