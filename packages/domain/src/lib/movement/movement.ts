import { IMovement, MoveTableType, START_RANK, START_FILE, END_RANK, END_FILE } from '@chess/core';

abstract class Movement implements IMovement {
  abstract buildMoveTable(): MoveTableType;

  protected isValidRankNumber(rankNumber: number): boolean {
    return rankNumber >= START_RANK && rankNumber <= END_RANK;
  }

  protected isValidFileNumber(fileNumber: number): boolean {
    return fileNumber >= START_FILE && fileNumber <= END_FILE;
  }
}

export { Movement };
