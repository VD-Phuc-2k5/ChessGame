import { IColor, MoveTableType } from '@chess/core';
import { Piece } from './piece.js';
import { QueenMovement } from '../movement/queenMovement.js';

class Queen extends Piece {
  constructor(protected side: IColor) {
    super('QUEEN', side);
  }

  public getMovementTable(): MoveTableType {
    const movement: QueenMovement = QueenMovement.getMovement();
    return movement.moveTable;
  }
}

export { Queen };
