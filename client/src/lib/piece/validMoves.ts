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

    if (color === PieceColor.White) {
      const step = row === 6 ? 2 : row === 7 ? 0 : 1;
      // move forward
      for (let i = 0; i <= step; i++) {
        validMoves.add(CBoard.moveFrom(position, "up", i));
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
      for (let i = 0; i <= step; i++) {
        validMoves.add(CBoard.moveFrom(position, "down", i));
      }

      // enPassant move
      if (row === 4) {
        validMoves.add(CBoard.moveFrom(position, "downLeft"));
        validMoves.add(CBoard.moveFrom(position, "downRight"));
      }

      ValidMoves.table.set(key, validMoves.get());
    }
  }

  private static generateKnightMoves(position: number) {
    const whiteKey = ValidMoves.hashKey(
      PieceColor.White,
      PieceType.Knight,
      position,
    );
    const blackKey = ValidMoves.hashKey(
      PieceColor.Black,
      PieceType.Knight,
      position,
    );
    const validMoves = ValidMoves.Moves();

    const addKnightValidMove = (direction1: string, direction2: string) => {
      validMoves.add(
        (() => {
          const current = CBoard.moveFrom(position, direction1, 2);
          return CBoard.moveFrom(current, direction2);
        })(),
      );
    };

    addKnightValidMove("up", "left");
    addKnightValidMove("up", "right");
    addKnightValidMove("down", "left");
    addKnightValidMove("down", "right");
    addKnightValidMove("left", "up");
    addKnightValidMove("left", "down");
    addKnightValidMove("right", "up");
    addKnightValidMove("right", "down");

    ValidMoves.table.set(whiteKey, validMoves.get());
    ValidMoves.table.set(blackKey, validMoves.get());
  }

  // up-right
  static initialize() {
    for (let p = 0; p < 64; p++) {
      ValidMoves.generatePawnMoves(PieceColor.White, PieceType.Pawn, p);
      ValidMoves.generatePawnMoves(PieceColor.Black, PieceType.Pawn, p);
      ValidMoves.generateKnightMoves(p);
    }
  }
}

export default ValidMoves;
