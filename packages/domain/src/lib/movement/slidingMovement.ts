import { IPosition, OffsetType } from '@chess/core';
import { Movement } from './movement.js';
import { Position } from '../position/position.js';

abstract class SlidingMovement extends Movement {
  constructor() {
    super();
  }

  protected getSlidingMoves(
    rankNumber: number,
    fileNumber: number,
    directions: OffsetType[]
  ): IPosition[] {
    const moves: IPosition[] = [];

    for (const [dr, df] of directions) {
      let newRank: number = rankNumber + dr;
      let newFile: number = fileNumber + df;

      while (this.isValidRankNumber(newRank) && this.isValidFileNumber(newFile)) {
        moves.push(Position.of(newRank, newFile));
        newRank += dr;
        newFile += df;
      }
    }

    return moves;
  }
}

export { SlidingMovement };
