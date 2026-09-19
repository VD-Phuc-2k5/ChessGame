import { IColor, MoveTableType } from '@chess/core';
import { Piece } from './piece.js';
import { BishopMovement } from '../movement/bishopMovement.js';

class Bishop extends Piece {
  constructor(protected side: IColor) {
    super('BISHOP', side);
  }

  public getMovementTable(): MoveTableType {
    const movement: BishopMovement = BishopMovement.getMovement();
    return movement.moveTable;
  }
}

export { Bishop };
