import { IColor, ICell, IPiece, IPosition } from '@chess/core';

abstract class Cell implements ICell {
  protected color: IColor | null = null;
  protected piece: IPiece | null = null;

  constructor(protected readonly position: IPosition) {
    this.applyColor();
  }

  protected abstract applyColor(): void;

  public getColor(): string {
    if (!this.color) {
      throw new Error('No color found');
    }
    return this.color.getColor();
  }

  public getPiece(): IPiece | null {
    return this.piece;
  }

  public setPiece(piece: IPiece): void {
    this.piece = piece;
  }

  public getPosition(): IPosition {
    return this.position;
  }
}

export { Cell };
