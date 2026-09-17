'use client';

import { JSX } from 'react/jsx-dev-runtime';

import { Board } from '@/components/board/board';

function BoardSection(): JSX.Element {
  return (
    <Board>
      <div className="flex items-end">
        <Board.Files />
        <Board.Grid />
      </div>
      <Board.Ranks />
    </Board>
  );
}

export default BoardSection;
