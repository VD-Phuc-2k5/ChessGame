import { Context, createContext, useContext } from 'react';

import { IBoardInfos } from '@/interfaces/iboardInfo';

const BoardContext: Context<IBoardInfos | null> = createContext<IBoardInfos | null>(null);

function useBoard(): IBoardInfos {
  const ctx: IBoardInfos | null = useContext(BoardContext);
  if (!ctx) {
    throw new Error('Board.* components must be used inside <Board>');
  }
  return ctx;
}

export { BoardContext, useBoard };
