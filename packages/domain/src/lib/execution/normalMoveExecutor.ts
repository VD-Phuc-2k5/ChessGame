import { IBoard, IMove, IPiece } from '@chess/core';
import { MoveExecutor } from './moveExecutor.js';

class NormalMoveExecutor extends MoveExecutor {
  constructor(board: IBoard) {
    super(board);
  }

  public execute(move: IMove): IPiece | null {
    const captured: IPiece | null = this.board.getCell(move.getTo())?.getPiece() ?? null;
    this.movePiece(move.getFrom(), move.getTo(), move.getPiece());
    return captured;
  }
}

export { NormalMoveExecutor };
