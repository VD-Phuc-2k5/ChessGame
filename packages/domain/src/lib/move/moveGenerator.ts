import { IBoard, IPiece, IMove, IPosition, ICell, PieceSymbolType } from '@chess/core';
import { Move } from './move.js';
import { Position } from '../position/position.js';
import { Board } from '../board/board.js';

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
    const moves: IMove[] = [];

    for (const to of this.getCandidatePositions(piece)) {
      if (!this.canGenerateMove(piece, to)) continue;
      if (this.isSlidingPiece(piece) && !this.isPathClear(from, to)) continue;
      moves.push(new Move(piece, from, to));
    }

    return moves;
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
    const target: IPiece | null = this.board.getCell(to)!.getPiece();
    if (target !== null) return false;

    const isDoubleStep: boolean = Math.abs(to.getRank() - piece.getPosition().getRank()) === 2;
    if (!isDoubleStep) return true;

    return this.isDoubleStepPathClear(piece);
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
