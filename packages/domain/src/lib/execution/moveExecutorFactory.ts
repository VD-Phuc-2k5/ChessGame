import { IBoard, IMove, MoveType } from '@chess/core';
import { IMoveExecutor } from './moveExecutor.js';
import { NormalMoveExecutor } from './normalMoveExecutor.js';
import { CastlingMoveExecutor } from './castlingMoveExecutor.js';
import { EnPassantMoveExecutor } from './enPassantMoveExecutor.js';
import { PromotionMoveExecutor } from './promotionMoveExecutor.js';

class MoveExecutorFactory {
  private readonly registry: Record<MoveType, (board: IBoard) => IMoveExecutor> = {
    NORMAL: (board: IBoard): NormalMoveExecutor => new NormalMoveExecutor(board),
    CASTLING: (board: IBoard): CastlingMoveExecutor => new CastlingMoveExecutor(board),
    EN_PASSANT: (board: IBoard): EnPassantMoveExecutor => new EnPassantMoveExecutor(board),
    PROMOTION: (board: IBoard): PromotionMoveExecutor => new PromotionMoveExecutor(board),
  };

  public createExecutor(move: IMove, board: IBoard): IMoveExecutor {
    return this.registry[move.getType()](board);
  }
}

export { MoveExecutorFactory };
