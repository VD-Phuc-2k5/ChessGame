import { MoveTableType, IPosition, START_RANK, START_FILE, END_RANK, END_FILE } from '@chess/core';
import { Movement } from './movement.js';
import { Position } from '../position/position.js';

class KnightMovement extends Movement {
  private static instance: KnightMovement | null;
  public readonly moveTable: MoveTableType;

  private constructor() {
    super();
    this.moveTable = this.buildMoveTable();
  }

  public static getMovement(): KnightMovement {
    if (!KnightMovement.instance) {
      KnightMovement.instance = new KnightMovement();
    }
    return KnightMovement.instance;
  }

  public buildMoveTable(): MoveTableType {
    const moveTable: MoveTableType = new Map();
    for (let rankNumber: number = START_RANK; rankNumber <= END_RANK; rankNumber++) {
      for (let fileNumber: number = START_FILE; fileNumber <= END_FILE; fileNumber++) {
        const square: IPosition = Position.of(rankNumber, fileNumber);
        const possibleMoves: IPosition[] = this.getPossibleMoves(rankNumber, fileNumber);
        moveTable.set(square.toString(), possibleMoves);
      }
    }
    return moveTable;
  }

  private getPossibleMoves(rankNumber: number, fileNumber: number): IPosition[] {
    const offsets: [number, number][] = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    const moves: IPosition[] = [];
    for (const [dr, df] of offsets) {
      const newRank: number = rankNumber + dr;
      const newFile: number = fileNumber + df;
      if (this.isValidRankNumber(newRank) && this.isValidFileNumber(newFile)) {
        moves.push(Position.of(newRank, newFile));
      }
    }
    return moves;
  }
}

export { KnightMovement };
