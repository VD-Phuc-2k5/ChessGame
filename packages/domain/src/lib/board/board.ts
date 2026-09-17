import { FILES, RANKS, FILE_ASCII_OFFSET, IBoard, ICell, IPiece } from '@chess/core';
import { WhiteCell, BlackCell } from '../cell/index.js';
import { BoardIterator } from './boardIterator.js';
import { PieceFactory } from '../piece/pieceFactory.js';

class Board implements IBoard, Iterable<ICell> {
  protected cells: Map<string, ICell> = new Map();
  protected static instance: Board | null = null;
  protected fileCount: number;
  protected rankCount: number;

  private constructor(public size: number) {
    this.fileCount = FILES.size;
    this.rankCount = RANKS.size;
    this.initialize();
  }

  static getBoardInstance(size: number): Board {
    if (Board.instance === null) {
      Board.instance = new Board(size);
    }
    return Board.instance;
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
  }

  protected placePiece(coordinate: string, piece: IPiece): void {
    const cell: ICell | undefined = this.cells.get(coordinate);
    if (cell) {
      cell.setPiece(piece);
    }
  }

  protected initializeCells(): void {
    for (let file: number = 1; file <= this.fileCount; file++) {
      for (let rank: number = 1; rank <= this.rankCount; rank++) {
        const rankDigit: string = RANKS.get(rank)!;
        const fileLetter: string = FILES.get(file)!;
        const coordinate: string = `${rankDigit}${fileLetter}`;
        const isWhite: boolean = (file + rank) % 2 === 0;
        this.cells.set(coordinate, isWhite ? new WhiteCell(coordinate) : new BlackCell(coordinate));
      }
    }
  }

  protected setupPieces(): void {
    this.placePiece('a1', PieceFactory.createWhiteRook());
    this.placePiece('b1', PieceFactory.createWhiteKnight());
    this.placePiece('c1', PieceFactory.createWhiteBishop());
    this.placePiece('d1', PieceFactory.createWhiteQueen());
    this.placePiece('e1', PieceFactory.createWhiteKing());
    this.placePiece('f1', PieceFactory.createWhiteBishop());
    this.placePiece('g1', PieceFactory.createWhiteKnight());
    this.placePiece('h1', PieceFactory.createWhiteRook());

    for (let file: number = 1; file <= this.fileCount; file++) {
      const coordinate = `${String.fromCharCode(FILE_ASCII_OFFSET + file)}2`;
      this.placePiece(coordinate, PieceFactory.createWhitePawn());
    }

    this.placePiece('a8', PieceFactory.createBlackRook());
    this.placePiece('b8', PieceFactory.createBlackKnight());
    this.placePiece('c8', PieceFactory.createBlackBishop());
    this.placePiece('d8', PieceFactory.createBlackQueen());
    this.placePiece('e8', PieceFactory.createBlackKing());
    this.placePiece('f8', PieceFactory.createBlackBishop());
    this.placePiece('g8', PieceFactory.createBlackKnight());
    this.placePiece('h8', PieceFactory.createBlackRook());

    for (let file: number = 1; file <= this.fileCount; file++) {
      const coordinate = `${String.fromCharCode(FILE_ASCII_OFFSET + file)}7`;
      this.placePiece(coordinate, PieceFactory.createBlackPawn());
    }
  }

  [Symbol.iterator](): Iterator<ICell> {
    return new BoardIterator(this.cells);
  }
}

export { Board };
