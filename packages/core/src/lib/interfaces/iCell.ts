import { IPiece } from './iPiece.js';
import { IPosition } from './iPosition.js';

interface ICell {
  getColor(): string;
  getPiece(): IPiece | null;
  getPosition(): IPosition;
  setPiece(piece: IPiece): void;
}

export { ICell };
