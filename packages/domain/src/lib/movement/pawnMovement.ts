import {
  IMovement,
  IColor,
  IPosition,
  DirectionType,
  MoveTableType,
  START_RANK,
  END_RANK,
  START_FILE,
  END_FILE,
} from '@chess/core';
import { Position } from '../position/position.js';
import { Movement } from './movement.js';

class PawnMovement extends Movement {
  private static readonly cache: Map<IColor, PawnMovement> = new Map();
  public readonly moveTable: MoveTableType;

  private constructor(private readonly side: IColor) {
    super();
    this.moveTable = this.buildMoveTable();
  }

  public static of(side: IColor): PawnMovement {
    let movement: PawnMovement | undefined = PawnMovement.cache.get(side);
    if (!movement) {
      movement = new PawnMovement(side);
      PawnMovement.cache.set(side, movement);
    }
    return movement;
  }

  public buildMoveTable(): MoveTableType {
    const moveTable: MoveTableType = new Map();

    for (let rankNumber: number = START_RANK; rankNumber <= END_RANK; rankNumber++) {
      for (let fileNumber: number = START_FILE; fileNumber <= END_FILE; fileNumber++) {
        const square: IPosition = Position.of(rankNumber, fileNumber);
        const forwardPositions: IPosition[] = this.getForwardPositions(rankNumber, fileNumber);
        const diagonalCapturePositions: IPosition[] = this.getDiagonalCapturePositions(
          rankNumber,
          fileNumber
        );
        const allMoves: IPosition[] = [...forwardPositions, ...diagonalCapturePositions];
        moveTable.set(square.toString(), allMoves);
      }
    }

    return moveTable;
  }

  private getDirection(): DirectionType {
    return this.side.getSideName() === 'white' ? -1 : 1;
  }

  private getStartRankNumber(): 7 | 2 {
    return this.side.getSideName() === 'white' ? 7 : 2;
  }

  private getForwardRankNumber(rankNumber: number, step: number): number {
    return rankNumber + step * this.getDirection();
  }

  private getDiagonalCapturePositions(rankNumber: number, fileNumber: number): IPosition[] {
    const diagonalPositions: IPosition[] = [];
    const forwardRankNumber: number = this.getForwardRankNumber(rankNumber, 1);

    if (this.isValidRankNumber(forwardRankNumber)) {
      const fileNumberLeft: number = fileNumber - 1;
      const fileNumberRight: number = fileNumber + 1;

      if (this.isValidFileNumber(fileNumberLeft)) {
        diagonalPositions.push(Position.of(forwardRankNumber, fileNumberLeft));
      }

      if (this.isValidFileNumber(fileNumberRight)) {
        diagonalPositions.push(Position.of(forwardRankNumber, fileNumberRight));
      }
    }

    return diagonalPositions;
  }

  private getForwardPositions(rankNumber: number, fileNumber: number): IPosition[] {
    const forwardPositions: IPosition[] = [];
    const forwardRankNumber: number = this.getForwardRankNumber(rankNumber, 1);
    if (this.isValidRankNumber(forwardRankNumber)) {
      forwardPositions.push(Position.of(forwardRankNumber, fileNumber));

      if (rankNumber === this.getStartRankNumber()) {
        const twoForwardRankNumber: number = this.getForwardRankNumber(rankNumber, 2);
        if (this.isValidRankNumber(twoForwardRankNumber)) {
          forwardPositions.push(Position.of(twoForwardRankNumber, fileNumber));
        }
      }
    }
    return forwardPositions;
  }
}

export { PawnMovement };
