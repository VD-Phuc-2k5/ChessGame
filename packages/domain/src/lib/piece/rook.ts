import { IColor, PieceSymbol } from '@chess/core';
import { Piece } from './piece.js';

class Rook extends Piece {
  constructor(protected side: IColor) {
    super('ROOK', side);
  }
}

export { Rook };
