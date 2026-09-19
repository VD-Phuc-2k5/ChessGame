import {
  MoveTableType,
  IPosition,
  START_RANK,
  START_FILE,
  END_RANK,
  END_FILE,
  Direction,
} from '@chess/core';
import { Movement } from './movement.js';
import { Position } from '../position/position.js';
import { Offset } from '../offset/offset.js';

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
      Offset.of(Direction.Left2Top),
      Offset.of(Direction.Left2Bottom),
      Offset.of(Direction.Right2Top),
      Offset.of(Direction.Right2Bottom),
      Offset.of(Direction.LeftTop2),
      Offset.of(Direction.RightTop2),
      Offset.of(Direction.LeftBottom2),
      Offset.of(Direction.RightBottom2),
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
