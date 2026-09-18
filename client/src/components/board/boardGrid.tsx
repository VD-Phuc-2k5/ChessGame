import { useBoard } from '@/context/BoardContext';
import { ICell } from '@chess/core';
import { JSX } from 'react/jsx-dev-runtime';

import CellComponent from './cell';

function BoardGrid(): JSX.Element {
  const { cells, size } = useBoard();
  return (
    <div style={{ width: size, height: size }} className="grid grid-cols-8 border-4">
      {cells.map((cell: ICell): JSX.Element => (
        <div
          key={cell.getPosition.toString()}
          className="grid aspect-square h-full w-full place-items-center"
        >
          <CellComponent
            color={cell.getColor()}
            coordinate={cell.getPosition().toString()}
            piece={cell.getPiece()}
          />
        </div>
      ))}
    </div>
  );
}

export { BoardGrid };
