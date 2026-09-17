import { IPiece, IColor, PieceSymbol, PieceSymbolType } from '@chess/core';

abstract class Piece implements IPiece {
  constructor(
    protected type: PieceSymbolType,
    protected side: IColor
  ) {}

  public toSymbol(): string {
    const color: string = this.side.getSideName();
    let symbol: string = PieceSymbol[this.type];
    if (symbol === '') {
      symbol = 'P';
    }
    return `${color[0]}${symbol}`;
  }
}

export { Piece };
