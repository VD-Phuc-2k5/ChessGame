import { IColor, MoveTableType } from '@chess/core';
import { Piece } from './piece.js';
import { RookMovement } from '../movement/rookMovement.js';

class Rook extends Piece {
  constructor(protected side: IColor) {
    super('ROOK', side);
  }

  public getMovementTable(): MoveTableType {
    const movement: RookMovement = RookMovement.getMovement();
    return movement.moveTable;
  }
}

export { Rook };
