import { IMove, IPosition, IPiece, MoveType, PieceSymbolType } from '@chess/core';

class Move implements IMove {
  constructor(
    private piece: IPiece,
    private from: IPosition,
    private to: IPosition,
    private type: MoveType = 'NORMAL',
    private promotion: PieceSymbolType | null = null
  ) {}

  getFrom(): IPosition {
    return this.from;
  }

  getTo(): IPosition {
    return this.to;
  }

  getPiece(): IPiece {
    return this.piece;
  }

  getType(): MoveType {
    return this.type;
  }

  getPromotionPiece(): PieceSymbolType | null {
    return this.promotion;
  }
}

export { Move };
