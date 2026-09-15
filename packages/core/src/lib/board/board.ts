import { IBoard, ICell } from '../interfaces/index.js';
import { FILE_COUNT, RANK_COUNT } from '../constants/index.js';
import { WhiteCell, BlackCell } from '../cell/index.js';

class Board implements IBoard {
  public cells: ICell[][] = [];
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
    for (let rank: number = 0; rank < RANK_COUNT; rank++) {
      const row: ICell[] = [];
      for (let file: number = 0; file < FILE_COUNT; file++) {
        if ((rank + file) % 2 === 0) {
          row.push(new WhiteCell());
        } else {
          row.push(new BlackCell());
        }
      }
      this.cells.push(row);
    }
  }
}

export { Board };
