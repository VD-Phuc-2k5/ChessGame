import { IBoard, IMove, IPiece, IPosition, ColorType } from '@chess/core';
import { MoveExecutor } from './moveExecutor.js';
import { Position } from '../position/position.js';

class EnPassantMoveExecutor extends MoveExecutor {
  constructor(board: IBoard) {
    super(board);
  }

  public execute(move: IMove): IPiece | null {
    const side: ColorType = move.getPiece().getSide();
    const direction: number = side === 'white' ? -1 : 1;
    const capturedPosition: IPosition = Position.of(
      move.getTo().getRank() - direction,
      move.getTo().getFile()
    );

    const captured: IPiece | null = this.getPieceAt(capturedPosition);
    this.board.getCell(capturedPosition)?.setPiece(null);
    this.movePiece(move.getFrom(), move.getTo(), move.getPiece());

    return captured;
  }
}

export { EnPassantMoveExecutor };
