import { useBoard } from '@/context/BoardContext';
import { BOARD_SIZE } from '@chess/core';
import { JSX } from 'react/jsx-dev-runtime';

import BoardLabel from '@/components/board/boardLabel';

function BoardRanks(): JSX.Element {
  const { ranks } = useBoard();
  return (
    <div
      className="grid grid-cols-8 border-x-4 border-transparent"
      style={{ width: BOARD_SIZE, height: 32 }}
    >
      {ranks.map((rank: string): JSX.Element => (
        <BoardLabel key={rank} value={rank} />
      ))}
    </div>
  );
}

export { BoardRanks };
