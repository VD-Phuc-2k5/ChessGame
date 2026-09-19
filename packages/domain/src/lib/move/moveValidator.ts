import { IBoard, IMove, IMoveValidator, IPiece, IPosition, ICell, ColorType } from '@chess/core';
import { Position } from '../position/position.js';
import { Board } from '../board/board.js';
import { MoveGenerator } from './moveGenerator.js';
import { AttackDetector } from '../attack/attackDetector.js';

class MoveValidator implements IMoveValidator {
  private static instance: MoveValidator | null = null;

  private constructor(
    private readonly board: IBoard,
    private readonly attackDetector: AttackDetector
  ) {}

  public static getInstance(): MoveValidator {
    if (!MoveValidator.instance) {
      const board: IBoard = Board.getBoardInstance();
      MoveValidator.instance = new MoveValidator(
        board,
        new AttackDetector(MoveGenerator.getInstance(), board)
      );
    }
    return MoveValidator.instance;
  }

  public isValidMove(move: IMove): boolean {
    const side: ColorType = move.getPiece().getSide();

    if (move.getType() === 'CASTLING') {
      if (this.attackDetector.isSquareAttacked(move.getFrom(), side)) return false;
      if (this.attackDetector.isSquareAttacked(this.getCastlingThroughSquare(move), side)) {
        return false;
      }
    }

    const captured: IPiece | null = this.makeMove(move);
    const isLegal: boolean = !this.attackDetector.isInCheck(side);
    this.undoMove(move, captured);

    return isLegal;
  }

  public isInCheck(side: ColorType): boolean {
    return this.attackDetector.isInCheck(side);
  }

  protected getCastlingThroughSquare(move: IMove): IPosition {
    const from: IPosition = move.getFrom();
    const to: IPosition = move.getTo();
    return Position.of((from.getRank() + to.getRank()) / 2, (from.getFile() + to.getFile()) / 2);
  }

  protected makeMove(move: IMove): IPiece | null {
    const fromCell: ICell | undefined = this.board.getCell(move.getFrom());
    const toCell: ICell | undefined = this.board.getCell(move.getTo());
    if (!fromCell || !toCell) return null;

    const captured: IPiece | null = toCell.getPiece();
    toCell.setPiece(move.getPiece());
    fromCell.setPiece(null);
    move.getPiece().setPosition(move.getTo());

    return captured;
  }

  protected undoMove(move: IMove, captured: IPiece | null): void {
    const fromCell: ICell | undefined = this.board.getCell(move.getFrom());
    const toCell: ICell | undefined = this.board.getCell(move.getTo());
    if (!fromCell || !toCell) return;

    move.getPiece().setPosition(move.getFrom());
    fromCell.setPiece(move.getPiece());
    toCell.setPiece(captured);
  }
}

export { MoveValidator };
