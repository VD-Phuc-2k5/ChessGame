import { IColor, MoveTableType } from '@chess/core';
import { Piece } from './piece.js';
import { KingMovement } from '../movement/kingMovement.js';

class King extends Piece {
  constructor(protected side: IColor) {
    super('KING', side);
  }

  public getMovementTable(): MoveTableType {
    const movement: KingMovement = KingMovement.getMovement();
    return movement.moveTable;
  }
}

export { King };
