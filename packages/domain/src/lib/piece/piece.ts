import { IPiece, IColor, PieceSymbolType } from '@chess/core';

abstract class Piece implements IPiece {
  constructor(
    protected type: PieceSymbolType,
    protected side: IColor
  ) {}

  public toSymbol(): string {
    const color: string = this.side.getSideName();
    return `${color[0]}${this.type[0]}`;
  }
}

export { Piece };
