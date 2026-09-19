import { MoveTableType } from '../types/moveTableType.js';
import { ColorType } from '../types/colorType.js';
import { PieceSymbolType } from '../constants/pieceSymbol.js';
import { IPosition } from './iPosition.js';

interface IPiece {
  toSymbol(): string;
  getMovementTable(): MoveTableType;
  getPosition(): IPosition;
  setPosition(position: IPosition): void;
  getSide(): ColorType;
  getType(): PieceSymbolType;
}

export { IPiece };
