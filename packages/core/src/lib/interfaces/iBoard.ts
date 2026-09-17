import { ICell } from './iCell.js';

interface IBoard {
  size: number;
  getFiles(): string[];
  getRanks(): string[];
  [Symbol.iterator](): Iterator<ICell>;
}

export { IBoard };
