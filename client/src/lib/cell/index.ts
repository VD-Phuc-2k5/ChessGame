import { IPiece } from '../piece';

class CCell {
  private position: number;
  private piece: IPiece | null;

  constructor(position: number, piece: IPiece | null) {
    this.position = position;
    this.piece = piece;
  }

  getPieceNotation(): string | null {
    const hasPiece = this.piece !== null;
    return hasPiece ? `${this.piece!.pieceColor}${this.piece!.pieceType}` : null;
  }

  get Position(): number {
    return this.position;
  }

  get Piece(): IPiece | null {
    return this.piece;
  }
}

export default CCell;
