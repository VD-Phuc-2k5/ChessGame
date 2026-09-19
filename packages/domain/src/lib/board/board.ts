import { FILES, RANKS, IBoard, ICell, IPiece, IPosition, Direction } from '@chess/core';
import { WhiteCell, BlackCell } from '../cell/index.js';
import { BoardIterator } from './boardIterator.js';
import { PieceFactory } from '../piece/pieceFactory.js';
import { Position } from '../position/position.js';
import { Offset } from '../offset/offset.js';

class Board implements IBoard, Iterable<ICell> {
  protected cells: Map<string, ICell> = new Map();
  protected static instance: Board | null = null;
  protected readonly fileCount: number;
  protected readonly rankCount: number;
  public size: number = 500;

  private constructor() {
    this.fileCount = FILES.size;
    this.rankCount = RANKS.size;
    this.initialize();
  }

  static getBoardInstance(): Board {
    if (Board.instance === null) {
      Board.instance = new Board();
    }
    return Board.instance;
  }

  public setSize(size: number): void {
    this.size = size;
  }

  public getFiles(): string[] {
    return [...FILES.values()];
  }

  public getRanks(): string[] {
    return [...RANKS.values()];
  }

  protected initialize(): void {
    this.initializeCells();
    this.setupPieces();
    this.initOffset();
  }

  protected placePiece(position: IPosition, piece: IPiece): void {
    const cell: ICell | undefined = this.cells.get(position.toString());
    if (cell) {
      cell.setPiece(piece);
    }
  }

  protected initializeCells(): void {
    for (let rank: number = 1; rank <= this.rankCount; rank++) {
      for (let file: number = 1; file <= this.fileCount; file++) {
        const position = Position.of(rank, file);
        const coordinate: string = position.toString();
        const isWhite: boolean = (file + rank) % 2 === 0;
        const cell: WhiteCell | BlackCell = isWhite
          ? new WhiteCell(position)
          : new BlackCell(position);
        this.cells.set(coordinate, cell);
      }
    }
  }

  protected setupPieces(): void {
    this.placePiece(Position.of(8, 1), PieceFactory.createWhiteRook());
    this.placePiece(Position.of(8, 2), PieceFactory.createWhiteKnight());
    this.placePiece(Position.of(8, 3), PieceFactory.createWhiteBishop());
    this.placePiece(Position.of(8, 4), PieceFactory.createWhiteQueen());
    this.placePiece(Position.of(8, 5), PieceFactory.createWhiteKing());
    this.placePiece(Position.of(8, 6), PieceFactory.createWhiteBishop());
    this.placePiece(Position.of(8, 7), PieceFactory.createWhiteKnight());
    this.placePiece(Position.of(8, 8), PieceFactory.createWhiteRook());

    for (let file: number = 1; file <= this.fileCount; file++) {
      this.placePiece(Position.of(7, file), PieceFactory.createWhitePawn());
    }

    this.placePiece(Position.of(1, 1), PieceFactory.createBlackRook());
    this.placePiece(Position.of(1, 2), PieceFactory.createBlackKnight());
    this.placePiece(Position.of(1, 3), PieceFactory.createBlackBishop());
    this.placePiece(Position.of(1, 4), PieceFactory.createBlackQueen());
    this.placePiece(Position.of(1, 5), PieceFactory.createBlackKing());
    this.placePiece(Position.of(1, 6), PieceFactory.createBlackBishop());
    this.placePiece(Position.of(1, 7), PieceFactory.createBlackKnight());
    this.placePiece(Position.of(1, 8), PieceFactory.createBlackRook());

    for (let file: number = 1; file <= this.fileCount; file++) {
      this.placePiece(Position.of(2, file), PieceFactory.createBlackPawn());
    }
  }

  protected initOffset(): void {
    Offset.register(Direction.Top, [-1, 0]);
    Offset.register(Direction.Bottom, [1, 0]);
    Offset.register(Direction.Left, [0, -1]);
    Offset.register(Direction.Right, [0, 1]);
    Offset.register(Direction.TopLeft, [-1, -1]);
    Offset.register(Direction.TopRight, [-1, 1]);
    Offset.register(Direction.BottomLeft, [1, -1]);
    Offset.register(Direction.BottomRight, [1, 1]);
    Offset.register(Direction.Left2Top, [-2, -1]);
    Offset.register(Direction.Left2Bottom, [2, -1]);
    Offset.register(Direction.Right2Top, [-2, 1]);
    Offset.register(Direction.Right2Bottom, [2, 1]);
    Offset.register(Direction.LeftTop2, [-1, -2]);
    Offset.register(Direction.RightTop2, [-1, 2]);
    Offset.register(Direction.LeftBottom2, [1, -2]);
    Offset.register(Direction.RightBottom2, [1, 2]);
  }

  [Symbol.iterator](): Iterator<ICell> {
    return new BoardIterator(this.cells);
  }
}

export { Board };
