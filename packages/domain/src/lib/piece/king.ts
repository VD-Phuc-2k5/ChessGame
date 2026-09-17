import { IColor, PieceSymbol } from '@chess/core';
import { Piece } from './piece.js';

class King extends Piece {
  constructor(protected side: IColor) {
    super('KING', side);
  }
}

export { King };
