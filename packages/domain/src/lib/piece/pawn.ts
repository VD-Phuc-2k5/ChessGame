import { IColor, PieceSymbol } from '@chess/core';
import { Piece } from './piece.js';

class Pawn extends Piece {
  constructor(protected side: IColor) {
    super('PAWN', side);
  }
}

export { Pawn };
