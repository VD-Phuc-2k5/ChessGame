import {
  getColumnIndex,
  getPositionFromCoords,
  getRowIndex,
  moveFrom,
  type Direction,
} from '@chess/core';

export enum PieceType {
  Pawn = 'P',
  Rook = 'R',
  Knight = 'N',
  Bishop = 'B',
  Queen = 'Q',
  King = 'K',
}

export enum PieceColor {
  White = 'w',
  Black = 'b',
}

export interface IPiece {
  pieceType: PieceType;
  pieceColor: PieceColor;
}

export class CCell {
  constructor(
    private readonly position: number,
    private readonly piece: IPiece | null
  ) {}

  getPieceNotation(): string | null {
    return this.piece ? `${this.piece.pieceColor}${this.piece.pieceType}` : null;
  }

  get Position(): number {
    return this.position;
  }

  get Piece(): IPiece | null {
    return this.piece;
  }
}

export class CBoard {
  private static readonly PIECE_ROWS = { WHITE: [6, 7], BLACK: [0, 1] };
  private static readonly PAWN_ROWS = { WHITE: 6, BLACK: 1 };

  static getColumnIndex = getColumnIndex;
  static getRowIndex = getRowIndex;
  static getPositionFromCoords = getPositionFromCoords;

  static moveFrom(position: number, direction: Direction, step = 1): number {
    return moveFrom(position, direction, step);
  }

  private static getPieceType(column: number): PieceType {
    return [
      PieceType.Rook,
      PieceType.Knight,
      PieceType.Bishop,
      PieceType.Queen,
      PieceType.King,
      PieceType.Bishop,
      PieceType.Knight,
      PieceType.Rook,
    ][column];
  }

  private static getPieceColor(row: number): PieceColor {
    return CBoard.PIECE_ROWS.WHITE.includes(row) ? PieceColor.White : PieceColor.Black;
  }

  static initialBoard(): CCell[] {
    return Array.from({ length: 64 }, (_, position) => {
      const row = CBoard.getRowIndex(position);
      const column = CBoard.getColumnIndex(position);

      if (!CBoard.PIECE_ROWS.WHITE.includes(row) && !CBoard.PIECE_ROWS.BLACK.includes(row)) {
        return new CCell(position, null);
      }

      const pieceColor = CBoard.getPieceColor(row);
      const pieceType =
        CBoard.PAWN_ROWS.WHITE === row || CBoard.PAWN_ROWS.BLACK === row
          ? PieceType.Pawn
          : CBoard.getPieceType(column);

      return new CCell(position, { pieceColor, pieceType });
    });
  }
}

export class ValidMoves {
  static readonly table = new Map<string, number[]>();

  static hashKey(color: PieceColor, piece: PieceType, position: number): string {
    return `${color}${piece}-${position}`;
  }

  static initialize(): void {
    for (let position = 0; position < 64; position += 1) {
      for (const color of [PieceColor.White, PieceColor.Black]) {
        ValidMoves.table.set(
          ValidMoves.hashKey(color, PieceType.Pawn, position),
          [CBoard.moveFrom(position, color === PieceColor.White ? 'up' : 'down')].filter(
            (move) => move !== -1
          )
        );
      }
    }
  }
}
