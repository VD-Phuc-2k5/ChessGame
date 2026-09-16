import { JSX } from 'react';

import { FILE_ASCII_OFFSET } from '@chess/core';
import { Board } from '@chess/domain';

import CellComponent from './cell';

function BoardComponent(): JSX.Element {
  const boardSize = 500;
  const board = Board.getBoardInstance(boardSize);
  const cells: JSX.Element[] = [];

  for (const cell of board) {
    const coordinate: string = cell.getCoordinate();
    const color: string = cell.getColor();
    cells.push(
      <div key={coordinate} className="grid h-full w-full place-items-center">
        <CellComponent color={color} coordinate={coordinate} />
      </div>
    );
  }

  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-end">
        <div className="flex h-full w-full items-end">
          {/* File Number */}
          <div className="grid w-8 grid-rows-8" style={{ height: boardSize }}>
            {Array.from({ length: 8 }, (_: unknown, index: number): JSX.Element => (
              <div key={index} className="grid h-full place-items-center">
                <span className="text-lg font-bold">{8 - index}</span>
              </div>
            ))}
          </div>
          {/* Board */}
          <div
            style={{ width: boardSize, height: boardSize }}
            className="grid grid-cols-8 border-4"
          >
            {cells}
          </div>
        </div>
        {/* Rank */}
        <div className="grid grid-cols-8" style={{ width: boardSize, height: 32 }}>
          {Array.from({ length: 8 }, (_: unknown, index: number): JSX.Element => (
            <div key={index} className="grid h-8 w-full place-items-center">
              <span className="text-lg font-bold">
                {String.fromCharCode(FILE_ASCII_OFFSET + index + 1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BoardComponent;
