import {
  IBoard,
  IMove,
  IPiece,
  IPosition,
  FILES,
  RANKS,
  PieceSymbol,
  PieceSymbolType,
} from '@chess/core';
import { MoveGenerator } from '../move/moveGenerator.js';
import { MoveValidator } from '../move/moveValidator.js';

class MoveNotationBuilder {
  private readonly generator: MoveGenerator = MoveGenerator.getInstance();

  constructor(
    private readonly board: IBoard,
    private readonly validator: MoveValidator
  ) {}

  public buildBase(move: IMove): string {
    if (move.getType() === 'CASTLING') {
      return move.getTo().getFile() === 7 ? 'O-O' : 'O-O-O';
    }
    return this.buildStandardNotation(move);
  }

  protected buildStandardNotation(move: IMove): string {
    const type: PieceSymbolType = move.getPiece().getType();
    const isCapture: boolean = this.isCapture(move);
    const isPawn: boolean = type === 'PAWN';

    let notation: string = PieceSymbol[type];

    if (isPawn) {
      if (isCapture) notation += FILES.get(move.getFrom().getFile());
    } else {
      notation += this.disambiguation(move);
    }

    if (isCapture) notation += 'x';
    notation += move.getTo().toString();

    if (move.getType() === 'PROMOTION') {
      notation += '=' + PieceSymbol.QUEEN;
    }

    return notation;
  }

  protected isCapture(move: IMove): boolean {
    if (move.getType() === 'EN_PASSANT') return true;
    return this.board.getCell(move.getTo())?.getPiece() !== null;
  }

  protected disambiguation(move: IMove): string {
    const others: IMove[] = this.findSameTargetMoves(move);
    if (others.length === 0) return '';

    const from: IPosition = move.getFrom();
    const sharesFile: boolean = others.some(
      (m: IMove): boolean => m.getFrom().getFile() === from.getFile()
    );

    if (sharesFile) return RANKS.get(from.getRank())!;
    return FILES.get(from.getFile())!;
  }

  protected findSameTargetMoves(move: IMove): IMove[] {
    const others: IMove[] = [];

    for (const cell of this.board) {
      const piece: IPiece | null = cell.getPiece();
      if (!piece) continue;
      if (piece === move.getPiece()) continue;
      if (piece.getType() !== move.getPiece().getType()) continue;
      if (piece.getSide() !== move.getPiece().getSide()) continue;

      for (const candidate of this.generator.generate(piece)) {
        if (candidate.getTo().toString() !== move.getTo().toString()) continue;
        if (this.validator.isValidMove(candidate)) others.push(candidate);
      }
    }

    return others;
  }
}

export { MoveNotationBuilder };
