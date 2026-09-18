import { useBoard } from '@/context/BoardContext';
import { JSX } from 'react/jsx-dev-runtime';

import BoardLabel from '@/components/board/boardLabel';

export function BoardFiles(): JSX.Element {
  const { size, files } = useBoard();
  return (
    <div
      className="grid grid-cols-8 border-x-4 border-transparent"
      style={{ width: size, height: 32 }}
    >
      {files.map((file: string): JSX.Element => (
        <BoardLabel key={file} value={file} />
      ))}
    </div>
  );
}
