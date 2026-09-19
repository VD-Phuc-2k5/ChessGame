import { useBoard } from '@/context/BoardContext';
import { JSX } from 'react/jsx-dev-runtime';

import BoardLabel from '@/components/board/boardLabel';

export function BoardFiles(): JSX.Element {
  const { size, files } = useBoard();
  return (
    <div
      className="board-files ml-8 box-border grid grid-cols-8 px-1"
      style={{ width: size, height: 32 }}
    >
      {files.map((file: string): JSX.Element => (
        <BoardLabel key={file} value={file} />
      ))}
    </div>
  );
}
