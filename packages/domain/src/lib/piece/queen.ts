import { IColor, PieceSymbol } from '@chess/core';
import { Piece } from './piece.js';

class Queen extends Piece {
  constructor(protected side: IColor) {
    super('QUEEN', side);
  }
}

export { Queen };
