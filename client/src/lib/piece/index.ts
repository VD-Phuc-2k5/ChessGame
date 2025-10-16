export enum PieceType {
  "Pawn" = "P",
  "Rook" = "R",
  "Knight" = "N",
  "Bishop" = "B",
  "Queen" = "Q",
  "King" = "K",
}
export enum PieceColor {
  "White" = "w",
  "Black" = "b",
}

export interface IPiece {
  pieceType: PieceType;
  pieceColor: PieceColor;
}
