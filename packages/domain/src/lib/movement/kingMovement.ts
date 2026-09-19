import { MoveTableType, IPosition, START_RANK, START_FILE, END_RANK, END_FILE } from '@chess/core';
import { Movement } from './movement.js';
import { Position } from '../position/position.js';

class KingMovement extends Movement {
  private static instance: KingMovement | null;
  public readonly moveTable: MoveTableType;

  private constructor() {
    super();
    this.moveTable = this.buildMoveTable();
  }

  public static getMovement(): KingMovement {
    if (!KingMovement.instance) {
      KingMovement.instance = new KingMovement();
    }
    return KingMovement.instance;
  }

  public buildMoveTable(): MoveTableType {
    const moveTable = new Map();
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
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
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

export { KingMovement };
