'use client';

import { JSX, RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { FILE_ASCII_OFFSET, ICell } from '@chess/core';
import { Board } from '@chess/domain';

import BoardOrientation, { Orientation } from './board-orientation';
import CellComponent from './cell';

function BoardComponent(): JSX.Element {
  const boardSize = 500;
  const [isFlipped, setIsFlipped] = useState(false);
  const boardRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  const board = useMemo((): Board => Board.getBoardInstance(boardSize), [boardSize]);
  const cells: ICell[] = useMemo((): ICell[] => [...board], [board]);

  const orderedCells: JSX.Element[] = useMemo(
    (): JSX.Element[] =>
      (isFlipped ? [...cells].reverse() : cells).map((cell: ICell): JSX.Element => (
        <div
          key={cell.getCoordinate()}
          className="grid aspect-square h-full w-full place-items-center"
        >
          <CellComponent
            color={cell.getColor()}
            coordinate={cell.getCoordinate()}
            piece={cell.getPiece()}
          />
        </div>
      )),
    [cells, isFlipped]
  );

  const fileNumbers: number[] = useMemo(
    (): number[] => (isFlipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1]),
    [isFlipped]
  );

  const rankLetters: string[] = useMemo((): string[] => {
    const letters: string[] = Array.from({ length: 8 }, (_: unknown, index: number): string =>
      String.fromCharCode(FILE_ASCII_OFFSET + index + 1)
    );
    return isFlipped ? [...letters].reverse() : letters;
  }, [isFlipped]);

  const handleRotate: (orientation: Orientation) => void = useCallback(
    (orientation: Orientation): void => {
      setIsFlipped(orientation === 'black');
    },
    []
  );

  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-hidden">
      <div style={{ perspective: '1000px' }}>
        <div ref={boardRef} className="flex flex-col items-end will-change-transform">
          <div className="flex h-full w-full items-end">
            <div
              className="grid w-8 grid-rows-8 border-y-4 border-transparent"
              style={{ height: boardSize }}
            >
              {fileNumbers.map((number: number, index: number): JSX.Element => (
                <div key={index} className="grid h-full place-items-center">
                  <span className="text-lg font-bold">{number}</span>
                </div>
              ))}
            </div>
            <div
              style={{ width: boardSize, height: boardSize }}
              className="grid grid-cols-8 border-4"
            >
              {orderedCells}
            </div>
          </div>
          <div
            className="grid grid-cols-8 border-x-4 border-transparent"
            style={{ width: boardSize, height: 32 }}
          >
            {rankLetters.map((letter: string, index: number): JSX.Element => (
              <div key={index} className="grid h-8 w-full place-items-center">
                <span className="text-lg font-bold">{letter}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BoardOrientation
        boardRef={boardRef}
        orientation={isFlipped ? 'black' : 'white'}
        onRotate={handleRotate}
      />
    </section>
  );
}

export default BoardComponent;
