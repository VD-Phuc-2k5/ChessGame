import { IMove, IPosition, IPiece } from '@chess/core';

class Move implements IMove {
  constructor(
    private piece: IPiece,
    private from: IPosition,
    private to: IPosition
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
}

export { Move };
