import { MoveTableType } from '../types/index.js';

interface IPiece {
  toSymbol(): string;
  getMovementTable(): MoveTableType;
}

export { IPiece };
