import { IBoard, IMove, IPiece, ColorType, PieceSymbolType } from '@chess/core';
import { MoveExecutor } from './moveExecutor.js';
import { PieceFactory } from '../piece/pieceFactory.js';

class PromotionMoveExecutor extends MoveExecutor {
  constructor(board: IBoard) {
    super(board);
  }

  public execute(move: IMove): IPiece | null {
    const captured: IPiece | null = this.board.getCell(move.getTo())?.getPiece() ?? null;
    this.movePiece(move.getFrom(), move.getTo(), move.getPiece());

    const side: ColorType = move.getPiece().getSide();
    const promotion: PieceSymbolType = move.getPromotionPiece() ?? 'QUEEN';
    const promoted: IPiece = PieceFactory.createPiece(side, promotion);
    promoted.setPosition(move.getTo());
    this.board.getCell(move.getTo())?.setPiece(promoted);

    return captured;
  }
}

export { PromotionMoveExecutor };
