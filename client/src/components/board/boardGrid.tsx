import { useBoard } from '@/context/BoardContext';
import { BOARD_SIZE, ICell } from '@chess/core';
import { JSX } from 'react/jsx-dev-runtime';

import CellComponent from './cell';

function BoardGrid(): JSX.Element {
  const { cells } = useBoard();
  return (
    <div style={{ width: BOARD_SIZE, height: BOARD_SIZE }} className="grid grid-cols-8 border-4">
      {cells.map((cell: ICell): JSX.Element => (
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
      ))}
    </div>
  );
}

export { BoardGrid };
