import { IBoardInfos } from '@/interfaces/iboardInfo';
import { BOARD_SIZE } from '@chess/core';
import { Board } from '@chess/domain';

import type { Orientation } from '@/components/board/boardOrientationControls';

function getBoardInfos(orientation: Orientation): IBoardInfos {
  const board = Board.getBoardInstance(BOARD_SIZE);

  if (orientation === 'black') {
    return {
      cells: [...board].reverse(),
      files: board.getFiles().reverse(),
      ranks: board.getRanks().reverse(),
    };
  }

  return {
    cells: [...board],
    files: board.getFiles(),
    ranks: board.getRanks(),
  };
}

export { getBoardInfos };
