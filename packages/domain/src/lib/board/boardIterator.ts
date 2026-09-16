import { ICell } from '@chess/core';

class BoardIterator implements Iterator<ICell> {
  private readonly iteraterCells: IterableIterator<ICell>;

  constructor(private readonly cells: Map<string, ICell>) {
    this.iteraterCells = this.cells.values();
  }

  next(): IteratorResult<ICell> {
    return this.iteraterCells.next();
  }
}

export { BoardIterator };
