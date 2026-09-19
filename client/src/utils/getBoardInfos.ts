import { IBoardRenderInfo } from '@/interfaces/iboardInfo';
import { Board } from '@chess/domain';

import type { Orientation } from '@/components/board/boardOrientationControls';

function getBoardInfos(orientation: Orientation): IBoardRenderInfo {
  const size: number = 500;
  const board = Board.getBoardInstance();
  board.setSize(size);

  if (orientation === 'black') {
    return {
      size,
      cells: [...board].reverse(),
      files: board.getFiles().reverse(),
      ranks: board.getRanks().reverse(),
    };
  }

  return {
    size,
    cells: [...board],
    files: board.getFiles(),
    ranks: board.getRanks(),
  };
}

export { getBoardInfos };
