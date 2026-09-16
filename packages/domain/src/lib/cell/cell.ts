import { IColor, ICell } from '@chess/core';

abstract class Cell implements ICell {
  protected color: IColor | null;

  constructor(protected cellCoordinate: string) {
    this.cellCoordinate = cellCoordinate;
    this.color = null;
    this.applyColor();
  }

  abstract applyColor(): void;

  public getColor(): string {
    if (this.color) {
      return this.color.getColor();
    }
    throw new Error('No color found');
  }

  public getCoordinate(): string {
    return this.cellCoordinate;
  }
}

export { Cell };
