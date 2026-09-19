import { IPosition } from './iPosition.js';
import { IPiece } from './iPiece.js';
import { MoveType } from '../types/moveType.js';
import { PieceSymbolType } from '../constants/pieceSymbol.js';

interface IMove {
  getFrom(): IPosition;
  getTo(): IPosition;
  getPiece(): IPiece;
  getType(): MoveType;
  getPromotionPiece(): PieceSymbolType | null;
}

export { IMove };
