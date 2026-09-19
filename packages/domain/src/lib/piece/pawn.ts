import { IColor, MoveTableType } from '@chess/core';
import { Piece } from './piece.js';
import { PawnMovement } from '../movement/pawnMovement.js';

class Pawn extends Piece {
  constructor(protected side: IColor) {
    super('PAWN', side);
  }

  public getMovementTable(): MoveTableType {
    const movement: PawnMovement = PawnMovement.of(this.side);
    return movement.moveTable;
  }
}

export { Pawn };
