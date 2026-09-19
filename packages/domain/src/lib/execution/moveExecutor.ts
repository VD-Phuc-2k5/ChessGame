import { IBoard, IMove, IPiece, IPosition, ICell } from '@chess/core';

interface IMoveExecutor {
  execute(move: IMove): IPiece | null;
}

abstract class MoveExecutor implements IMoveExecutor {
  constructor(protected readonly board: IBoard) {}

  public abstract execute(move: IMove): IPiece | null;

  protected movePiece(from: IPosition, to: IPosition, piece: IPiece): void {
    const fromCell: ICell | undefined = this.board.getCell(from);
    const toCell: ICell | undefined = this.board.getCell(to);
    if (!fromCell || !toCell) return;

    piece.setPosition(to);
    toCell.setPiece(piece);
    fromCell.setPiece(null);
  }

  protected getPieceAt(position: IPosition): IPiece | null {
    return this.board.getCell(position)?.getPiece() ?? null;
  }
}

export { IMoveExecutor, MoveExecutor };
