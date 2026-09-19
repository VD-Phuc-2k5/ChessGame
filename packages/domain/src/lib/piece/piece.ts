import {
  IPiece,
  IColor,
  IPosition,
  PieceSymbol,
  PieceSymbolType,
  MoveTableType,
  ColorType,
} from '@chess/core';

abstract class Piece implements IPiece {
  protected position: IPosition | null;
  constructor(
    protected type: PieceSymbolType,
    protected side: IColor
  ) {
    this.position = null;
  }

  abstract getMovementTable(): MoveTableType;

  public toSymbol(): string {
    const color: string = this.side.getSideName();
    let symbol: string = PieceSymbol[this.type];
    if (symbol === '') {
      symbol = 'P';
    }
    return `${color[0]}${symbol}`;
  }

  public setPosition(position: IPosition): void {
    this.position = position;
  }

  public getPosition(): IPosition {
    if (!this.position) {
      throw new Error('Piece position is not set');
    }
    return this.position;
  }

  public getSide(): ColorType {
    return this.side.getSideName();
  }

  public getType(): PieceSymbolType {
    return this.type;
  }
}

export { Piece };
