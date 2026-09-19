import { IMove, IPosition, IPiece, MoveType } from '@chess/core';

class Move implements IMove {
  constructor(
    private piece: IPiece,
    private from: IPosition,
    private to: IPosition,
    private type: MoveType = 'NORMAL'
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
}

export { Move };
