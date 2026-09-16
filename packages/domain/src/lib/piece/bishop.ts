import { IColor } from '@chess/core';
import { Piece } from './piece.js';

class Bishop extends Piece {
  constructor(protected side: IColor) {
    super('BISHOP', side);
  }
}

export { Bishop };
