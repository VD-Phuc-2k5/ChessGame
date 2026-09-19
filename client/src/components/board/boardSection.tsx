'use client';

import { JSX } from 'react/jsx-dev-runtime';

import { Board } from '@/components/board/board';
import ClockPanel from '@/components/board/clockPanel';
import MoveHistoryPanel from '@/components/board/moveHistoryPanel';

function BoardSection(): JSX.Element {
  return (
    <Board>
      <div className="board-layout">
        <div className="board-main">
          <ClockPanel />
          <div className="mt-4 flex items-end">
            <Board.Ranks />
            <Board.Grid />
          </div>
          <Board.Files />
        </div>
        <MoveHistoryPanel />
      </div>
    </Board>
  );
}

export default BoardSection;
