'use client';

import { JSX } from 'react/jsx-dev-runtime';

import { Board } from '@/components/board/board';

function BoardSection(): JSX.Element {
  return (
    <Board>
      <div className="flex items-end">
        <Board.Ranks />
        <Board.Grid />
      </div>
      <Board.Files />
    </Board>
  );
}

export default BoardSection;
