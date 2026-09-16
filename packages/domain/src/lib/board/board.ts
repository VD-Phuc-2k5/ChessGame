import { FILE_COUNT, FILE_ASCII_OFFSET, RANK_COUNT, IBoard, ICell } from '@chess/core';
import { WhiteCell, BlackCell } from '../cell/index.js';
import { BoardIterator } from './boardIterator.js';

class Board implements IBoard, Iterable<ICell> {
  public cells: Map<string, ICell> = new Map();
  protected static instance: Board | null = null;

  private constructor(public size: number) {
    this.initialize();
  }

  static getBoardInstance(size: number): Board {
    if (Board.instance === null) {
      Board.instance = new Board(size);
    }
    return Board.instance;
  }

  protected initialize(): void {
    for (let rank: number = RANK_COUNT; rank >= 1; rank--) {
      for (let file: number = 1; file <= FILE_COUNT; file++) {
        const coordinate = `${String.fromCharCode(FILE_ASCII_OFFSET + file)}${rank}`;
        const cell: ICell =
          (rank + file) % 2 === 0 ? new WhiteCell(coordinate) : new BlackCell(coordinate);
        this.cells.set(coordinate, cell);
      }
    }
  }

  [Symbol.iterator](): Iterator<ICell> {
    return new BoardIterator(this.cells);
  }
}

export { Board };
