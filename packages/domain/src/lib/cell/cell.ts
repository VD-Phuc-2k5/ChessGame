import { IColor, ICell, IPiece } from '@chess/core';

abstract class Cell implements ICell {
  protected color: IColor | null;
  protected piece: IPiece | null = null;

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

  public getPiece(): IPiece | null {
    return this.piece;
  }

  public setPiece(piece: IPiece): void {
    this.piece = piece;
  }

  public getCoordinate(): string {
    return this.cellCoordinate;
  }
}

export { Cell };
