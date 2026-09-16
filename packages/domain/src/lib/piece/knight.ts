import { IColor, PieceSymbol } from '@chess/core';
import { Piece } from './piece.js';

class Knight extends Piece {
  constructor(protected side: IColor) {
    super('KNIGHT', side);
  }
}

export { Knight };
