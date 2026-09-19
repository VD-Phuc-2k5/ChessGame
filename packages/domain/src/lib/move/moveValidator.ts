import { IBoard, IMove, IMoveValidator, IPiece, IPosition, ICell, ColorType } from '@chess/core';
import { MoveGenerator } from './moveGenerator.js';

class MoveValidator implements IMoveValidator {
  constructor(private readonly board: IBoard) {}

  public isValidMove(move: IMove): boolean {
    const piece: IPiece = move.getPiece();
    const captured: IPiece | null = this.makeMove(move);
    const isLegal: boolean = !this.isKingInCheck(piece.getSide());
    this.undoMove(move, captured);

    return isLegal;
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

  protected isKingInCheck(side: ColorType): boolean {
    const kingPosition: IPosition | null = this.findKingPosition(side);
    if (!kingPosition) return false;

    const generator: MoveGenerator = MoveGenerator.getInstance();

    for (const cell of this.board) {
      const enemy: IPiece | null = cell.getPiece();
      if (!enemy || enemy.getSide() === side) continue;

      for (const move of generator.generate(enemy)) {
        if (move.getTo().toString() === kingPosition.toString()) {
          return true;
        }
      }
    }

    return false;
  }

  protected findKingPosition(side: ColorType): IPosition | null {
    for (const cell of this.board) {
      const piece: IPiece | null = cell.getPiece();
      if (!piece) continue;
      if (piece.getType() === 'KING' && piece.getSide() === side) {
        return cell.getPosition();
      }
    }

    return null;
  }
}

export { MoveValidator };
