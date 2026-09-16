import { IPiece } from './iPiece.js';

interface ICell {
  getColor(): string;
  getPiece(): IPiece | null;
  getCoordinate(): string;
  setPiece(piece: IPiece): void;
}

export { ICell };
