import { useBoard } from '@/context/BoardContext';
import { JSX } from 'react/jsx-dev-runtime';

import BoardLabel from '@/components/board/boardLabel';

function BoardRanks(): JSX.Element {
  const { ranks, size } = useBoard();
  return (
    <div className="board-ranks box-border grid w-8 grid-rows-8 py-1" style={{ height: size }}>
      {ranks.map((rank: string): JSX.Element => (
        <BoardLabel key={rank} value={rank} />
      ))}
    </div>
  );
}

export { BoardRanks };
