import {
  IBoard,
  IPiece,
  IMove,
  IPosition,
  ICell,
  PieceSymbolType,
  ColorType,
  CastlingRightType,
} from '@chess/core';
import { Move } from './move.js';
import { Position } from '../position/position.js';
import { Board } from '../board/board.js';
import { GameState } from '../game/gameState.js';

class MoveGenerator {
  private static instance: MoveGenerator | null = null;

  private constructor(private readonly board: IBoard) {}

  public static getInstance(): MoveGenerator {
    if (!MoveGenerator.instance) {
      MoveGenerator.instance = new MoveGenerator(Board.getBoardInstance());
    }
    return MoveGenerator.instance;
  }

  public generate(piece: IPiece): IMove[] {
    const from: IPosition = piece.getPosition();
    const moves: IMove[] = this.generateRegularMoves(piece, from);
    this.addSpecialMoves(piece, from, moves);
    return moves;
  }

  protected generateRegularMoves(piece: IPiece, from: IPosition): IMove[] {
    const moves: IMove[] = [];

    for (const to of this.getCandidatePositions(piece)) {
      if (!this.isValidRegularMove(piece, from, to)) continue;
      moves.push(new Move(piece, from, to));
    }

    return moves;
  }

  protected isValidRegularMove(piece: IPiece, from: IPosition, to: IPosition): boolean {
    return this.canGenerateMove(piece, to) && this.isMovePathValid(piece, from, to);
  }

  protected isMovePathValid(piece: IPiece, from: IPosition, to: IPosition): boolean {
    return !this.isSlidingPiece(piece) || this.isPathClear(from, to);
  }

  protected addSpecialMoves(piece: IPiece, from: IPosition, moves: IMove[]): void {
    if (this.isPawn(piece)) {
      this.addEnPassantMove(piece, from, moves);
    } else if (this.isKing(piece)) {
      this.addCastlingMoves(piece, from, moves);
    }
  }

  protected isKing(piece: IPiece): boolean {
    return piece.getType() === 'KING';
  }

  protected addEnPassantMove(piece: IPiece, from: IPosition, moves: IMove[]): void {
    const target: IPosition | null = GameState.getInstance().getEnPassantTarget();
    if (!target) return;
    if (!this.isEnPassantCapture(piece, from, target)) return;

    moves.push(new Move(piece, from, target));
  }

  protected isEnPassantCapture(piece: IPiece, from: IPosition, target: IPosition): boolean {
    if (!this.isForwardDiagonal(from, target, piece.getSide())) return false;

    const captured: IPiece | null = this.getEnPassantCapturedPawn(piece.getSide(), target);
    return (
      captured !== null && captured.getType() === 'PAWN' && captured.getSide() !== piece.getSide()
    );
  }

  protected isForwardDiagonal(from: IPosition, target: IPosition, side: ColorType): boolean {
    const direction: number = side === 'white' ? -1 : 1;
    return (
      Math.abs(target.getFile() - from.getFile()) === 1 &&
      target.getRank() - from.getRank() === direction
    );
  }

  protected getEnPassantCapturedPawn(side: ColorType, target: IPosition): IPiece | null {
    const direction: number = side === 'white' ? -1 : 1;
    const capturedPosition: IPosition = Position.of(target.getRank() - direction, target.getFile());
    return this.board.getCell(capturedPosition)?.getPiece() ?? null;
  }

  protected addCastlingMoves(piece: IPiece, from: IPosition, moves: IMove[]): void {
    if (!this.isKingOnHomeSquare(from)) return;
    this.addKingsideCastleMove(piece, from, moves);
    this.addQueensideCastleMove(piece, from, moves);
  }

  protected isKingOnHomeSquare(from: IPosition): boolean {
    return from.getFile() === 5 && (from.getRank() === 8 || from.getRank() === 1);
  }

  protected addKingsideCastleMove(piece: IPiece, from: IPosition, moves: IMove[]): void {
    const side: ColorType = piece.getSide();
    const right: CastlingRightType = side === 'white' ? 'K' : 'k';
    if (!this.canCastle(side, right, 8, [6, 7])) return;

    moves.push(new Move(piece, from, Position.of(this.getBackRank(side), 7)));
  }

  protected addQueensideCastleMove(piece: IPiece, from: IPosition, moves: IMove[]): void {
    const side: ColorType = piece.getSide();
    const right: CastlingRightType = side === 'white' ? 'Q' : 'q';
    if (!this.canCastle(side, right, 1, [2, 3, 4])) return;

    moves.push(new Move(piece, from, Position.of(this.getBackRank(side), 3)));
  }

  protected canCastle(
    side: ColorType,
    right: CastlingRightType,
    rookFile: number,
    emptyFiles: number[]
  ): boolean {
    return (
      GameState.getInstance().hasCastlingRight(right) &&
      this.isRookAt(this.getBackRank(side), rookFile, side) &&
      this.areSquaresEmpty(this.getBackRank(side), emptyFiles)
    );
  }

  protected getBackRank(side: ColorType): number {
    return side === 'white' ? 8 : 1;
  }

  protected isRookAt(rank: number, file: number, side: ColorType): boolean {
    const piece: IPiece | null = this.board.getCell(Position.of(rank, file))?.getPiece() ?? null;
    return piece !== null && piece.getType() === 'ROOK' && piece.getSide() === side;
  }

  protected areSquaresEmpty(rank: number, files: number[]): boolean {
    return files.every((file: number): boolean => {
      const cell: ICell | undefined = this.board.getCell(Position.of(rank, file));
      return cell !== undefined && cell.getPiece() === null;
    });
  }

  protected getCandidatePositions(piece: IPiece): IPosition[] {
    return piece.getMovementTable().get(piece.getPosition().toString()) ?? [];
  }

  protected canGenerateMove(piece: IPiece, to: IPosition): boolean {
    if (!this.isOnBoard(to)) return false;
    if (this.isPawn(piece)) return this.canGeneratePawnMove(piece, to);
    return this.canGenerateRegularMove(piece, to);
  }

  protected isOnBoard(to: IPosition): boolean {
    return this.board.getCell(to) !== undefined;
  }

  protected canGenerateRegularMove(piece: IPiece, to: IPosition): boolean {
    const target: IPiece | null = this.board.getCell(to)!.getPiece();
    return target === null || target.getSide() !== piece.getSide();
  }

  protected isPawn(piece: IPiece): boolean {
    return piece.getType() === 'PAWN';
  }

  protected canGeneratePawnMove(piece: IPiece, to: IPosition): boolean {
    return this.isPawnCapture(piece, to) ? this.canCapture(piece, to) : this.canAdvance(piece, to);
  }

  protected isPawnCapture(piece: IPiece, to: IPosition): boolean {
    return to.getFile() !== piece.getPosition().getFile();
  }

  protected canCapture(piece: IPiece, to: IPosition): boolean {
    const target: IPiece | null = this.board.getCell(to)!.getPiece();
    return target !== null && target.getSide() !== piece.getSide();
  }

  protected canAdvance(piece: IPiece, to: IPosition): boolean {
    if (!this.isSquareEmpty(to)) return false;
    return !this.isDoubleStep(piece, to) || this.isDoubleStepPathClear(piece);
  }

  protected isSquareEmpty(to: IPosition): boolean {
    return this.board.getCell(to)?.getPiece() === null;
  }

  protected isDoubleStep(piece: IPiece, to: IPosition): boolean {
    return Math.abs(to.getRank() - piece.getPosition().getRank()) === 2;
  }

  protected isDoubleStepPathClear(piece: IPiece): boolean {
    const direction: number = piece.getSide() === 'white' ? -1 : 1;
    const middlePosition: IPosition = Position.of(
      piece.getPosition().getRank() + direction,
      piece.getPosition().getFile()
    );
    const middleCell: ICell | undefined = this.board.getCell(middlePosition);
    return middleCell !== undefined && middleCell.getPiece() === null;
  }

  protected isSlidingPiece(piece: IPiece): boolean {
    const type: PieceSymbolType = piece.getType();
    return type === 'BISHOP' || type === 'ROOK' || type === 'QUEEN';
  }

  protected isPathClear(from: IPosition, to: IPosition): boolean {
    const dx: number = Math.sign(to.getRank() - from.getRank());
    const dy: number = Math.sign(to.getFile() - from.getFile());

    let x: number = from.getRank() + dx;
    let y: number = from.getFile() + dy;

    while (x !== to.getRank() || y !== to.getFile()) {
      const cell: ICell | undefined = this.board.getCell(Position.of(x, y));
      if (!cell || cell.getPiece()) return false;
      x += dx;
      y += dy;
    }

    return true;
  }
}

export { MoveGenerator };
