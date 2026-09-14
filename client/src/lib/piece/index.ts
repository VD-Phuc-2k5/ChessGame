import ValidMoves from './validMoves';

enum PieceType {
  Pawn = 'P',
  Rook = 'R',
  Knight = 'N',
  Bishop = 'B',
  Queen = 'Q',
  King = 'K',
}
enum PieceColor {
  White = 'w',
  Black = 'b',
}

export interface IPiece {
  pieceType: PieceType;
  pieceColor: PieceColor;
}

export { PieceColor, PieceType, ValidMoves };
