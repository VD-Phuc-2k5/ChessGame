import { IPosition } from './iPosition.js';
import { IPiece } from './iPiece.js';
import { MoveType } from '../types/moveType.js';

interface IMove {
  getFrom(): IPosition;
  getTo(): IPosition;
  getPiece(): IPiece;
  getType(): MoveType;
}

export { IMove };
