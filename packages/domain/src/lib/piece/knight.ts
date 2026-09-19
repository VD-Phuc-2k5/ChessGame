import { IColor, MoveTableType } from '@chess/core';
import { Piece } from './piece.js';
import { KnightMovement } from '../movement/knightMovement.js';

class Knight extends Piece {
  constructor(protected side: IColor) {
    super('KNIGHT', side);
  }

  public getMovementTable(): MoveTableType {
    const movement: KnightMovement = KnightMovement.getMovement();
    return movement.moveTable;
  }
}

export { Knight };
