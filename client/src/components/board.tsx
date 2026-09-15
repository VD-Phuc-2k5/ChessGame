import { JSX } from 'react';

import { Board, ICell } from '@chess/core';

import CellComponent from './cell';

function BoardComponent(): JSX.Element {
  const boardSize = 500;
  const board = Board.getBoardInstance(boardSize);
  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div>
        <div className="flex h-full w-full">
          {/* File Number */}
          <div className="flex w-8 flex-col">
            {Array.from({ length: 8 }, (_: unknown, index: number): JSX.Element => (
              <div key={index} className="flex h-full w-full items-center justify-center">
                <span className="text-lg font-bold">{8 - index}</span>
              </div>
            ))}
          </div>
          {/* Board */}
          <div style={{ width: boardSize, height: boardSize }} className="flex flex-col border-4">
            {board.cells.map((row: ICell[], rowIndex: number): JSX.Element => (
              <div key={rowIndex} className="flex h-full w-full">
                {row.map((cell: ICell, cellIndex: number): JSX.Element => (
                  <div key={cellIndex} className="h-full w-full">
                    <CellComponent color={cell.getColor()} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Rank */}
        <div className="flex h-full w-full">
          {Array.from({ length: 8 }, (_: unknown, index: number): JSX.Element => (
            <div key={index} className="flex h-full w-full items-center justify-center">
              <span className="text-lg font-bold">{String.fromCharCode(65 + index)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BoardComponent;
