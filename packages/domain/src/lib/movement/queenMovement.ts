import { MoveTableType, IPosition, START_RANK, START_FILE, END_RANK, END_FILE } from '@chess/core';
import { SlidingMovement } from './slidingMovement.js';
import { Position } from '../position/position.js';

class QueenMovement extends SlidingMovement {
  private static instance: QueenMovement | null;
  public readonly moveTable: MoveTableType;

  private constructor() {
    super();
    this.moveTable = this.buildMoveTable();
  }

  public static getMovement(): QueenMovement {
    if (!QueenMovement.instance) {
      QueenMovement.instance = new QueenMovement();
    }
    return QueenMovement.instance;
  }

  public buildMoveTable(): MoveTableType {
    const moveTable: MoveTableType = new Map();

    for (let rankNumber: number = START_RANK; rankNumber <= END_RANK; rankNumber++) {
      for (let fileNumber: number = START_FILE; fileNumber <= END_FILE; fileNumber++) {
        const square: IPosition = Position.of(rankNumber, fileNumber);
        const slidingMoves: IPosition[] = this.getSlidingMoves(rankNumber, fileNumber, [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ]);
        moveTable.set(square.toString(), slidingMoves);
      }
    }
    return moveTable;
  }
}

export { QueenMovement };
