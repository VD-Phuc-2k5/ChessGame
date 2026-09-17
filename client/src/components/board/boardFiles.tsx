import { useBoard } from '@/context/BoardContext';
import { BOARD_SIZE } from '@chess/core';
import { JSX } from 'react/jsx-dev-runtime';

import BoardLabel from '@/components/board/boardLabel';

export function BoardFiles(): JSX.Element {
  const { files } = useBoard();
  return (
    <div
      className="grid w-8 grid-rows-8 border-y-4 border-transparent"
      style={{ height: BOARD_SIZE }}
    >
      {files.map((file: string): JSX.Element => (
        <BoardLabel key={file} value={file} />
      ))}
    </div>
  );
}
