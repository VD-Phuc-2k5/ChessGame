import { IPosition } from './iPosition.js';
import { IPiece } from './iPiece.js';

interface IMove {
  getFrom(): IPosition;
  getTo(): IPosition;
  getPiece(): IPiece;
}

export { IMove };
