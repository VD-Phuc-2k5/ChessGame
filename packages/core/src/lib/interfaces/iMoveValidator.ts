import { IMove } from './iMove.js';

interface IMoveValidator {
  isValidMove(move: IMove): boolean;
}

export { IMoveValidator };
