import CCell from "@/lib/cell";
import { PieceColor, PieceType } from "../piece";

class CBoard {
  private static PIECE_ROWS = { WHITE: [6, 7], BLACK: [0, 1] };
  private static PAWN_ROWS = { WHITE: 1, BLACK: 6 };
  private static getPieceType = (col: number): PieceType => {
    const typeMap: Record<number, PieceType> = {
      0: PieceType.Rook,
      1: PieceType.Knight,
      2: PieceType.Bishop,
      3: PieceType.Queen,
      4: PieceType.King,
      5: PieceType.Bishop,
      6: PieceType.Knight,
      7: PieceType.Rook,
    };
    return typeMap[col];
  };
  private static getPieceColor = (row: number): PieceColor => {
    if (CBoard.PIECE_ROWS.WHITE.includes(row)) return PieceColor.White;
    return PieceColor.Black;
  };

  static getColumnIndex(position: number): number {
    return position % 8;
  }

  static getRowIndex(position: number): number {
    return Math.floor(position / 8);
  }

  static initialBoard(): CCell[] {
    const isPieceRow = (row: number): boolean =>
      CBoard.PIECE_ROWS.WHITE.includes(row) ||
      CBoard.PIECE_ROWS.BLACK.includes(row);

    const isPawnRow = (row: number): boolean =>
      row === this.PAWN_ROWS.WHITE || row === this.PAWN_ROWS.BLACK;

    return Array.from({ length: 64 }, (_, position) => {
      const row = CBoard.getRowIndex(position);
      const col = CBoard.getColumnIndex(position);

      if (!isPieceRow(row)) {
        return new CCell(position, null);
      }

      const pieceColor = CBoard.getPieceColor(row);

      if (isPawnRow(row)) {
        return new CCell(position, {
          pieceColor,
          pieceType: PieceType.Pawn,
        });
      }

      return new CCell(position, {
        pieceColor,
        pieceType: CBoard.getPieceType(col),
      });
    });
  }
}

export default CBoard;
