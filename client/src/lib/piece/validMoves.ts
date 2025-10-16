import { PieceType, PieceColor } from ".";
import CBoard from "../board";

class ValidMoves {
  static table: Map<string, number[]> = new Map();

  private static hashKey(
    color: PieceColor,
    piece: PieceType,
    position: number,
  ): string {
    return `${color}${piece}-${position}`;
  }

  private static Moves() {
    const moves: number[] = [];
    return {
      add: (position: number) => {
        if (position !== -1) moves.push(position);
      },
      get: () => moves,
    };
  }

  private static generatePawnMoves(
    color: PieceColor,
    piece: PieceType,
    position: number,
  ) {
    const key = ValidMoves.hashKey(color, piece, position);
    const row = CBoard.getRowIndex(position);
    const validMoves = ValidMoves.Moves();
    let current: number = position;

    if (color === PieceColor.White) {
      const step = row === 6 ? 2 : row === 7 ? 0 : 1;
      // move forward
      for (let i = 0; i < step; i++) {
        current = CBoard.moveFrom(current, "up");
        if (current === -1) break;
        validMoves.add(current);
      }

      // enPassant move
      if (row === 3) {
        validMoves.add(CBoard.moveFrom(position, "upLeft"));
        validMoves.add(CBoard.moveFrom(position, "upRight"));
      }

      ValidMoves.table.set(key, validMoves.get());
    } else {
      const step = row === 1 ? 2 : row === 0 ? 0 : 1;
      // move forward
      for (let i = 0; i < step; i++) {
        current = CBoard.moveFrom(current, "down");
        if (current === -1) break;
        validMoves.add(current);
      }

      // enPassant move
      if (row === 4) {
        validMoves.add(CBoard.moveFrom(position, "downLeft"));
        validMoves.add(CBoard.moveFrom(position, "downRight"));
      }

      ValidMoves.table.set(key, validMoves.get());
    }
  }

  static initialize() {
    for (let p = 0; p < 64; p++) {
      ValidMoves.generatePawnMoves(PieceColor.White, PieceType.Pawn, p);
      ValidMoves.generatePawnMoves(PieceColor.Black, PieceType.Pawn, p);
    }
  }
}

export default ValidMoves;
