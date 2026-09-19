import { ICell } from './iCell.js';
import { IPosition } from './iPosition.js';

interface IBoard {
  getFiles(): string[];
  getRanks(): string[];
  getCell(position: IPosition): ICell | undefined;
  setSize(size: number): void;
  reset(): void;
  [Symbol.iterator](): Iterator<ICell>;
}

export { IBoard };
