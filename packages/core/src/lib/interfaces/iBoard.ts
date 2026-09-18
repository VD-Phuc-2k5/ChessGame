import { ICell } from './iCell.js';

interface IBoard {
  getFiles(): string[];
  getRanks(): string[];
  setSize(size: number): void;
  [Symbol.iterator](): Iterator<ICell>;
}

export { IBoard };
