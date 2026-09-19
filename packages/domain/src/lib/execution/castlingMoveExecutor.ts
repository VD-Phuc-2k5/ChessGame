import { IBoard, IMove, IPiece, IPosition, ColorType } from '@chess/core';
import { MoveExecutor } from './moveExecutor.js';
import { Position } from '../position/position.js';

class CastlingMoveExecutor extends MoveExecutor {
  constructor(board: IBoard) {
    super(board);
  }

  public execute(move: IMove): IPiece | null {
    const side: ColorType = move.getPiece().getSide();
    const backRank: number = side === 'white' ? 8 : 1;
    const isKingside: boolean = move.getTo().getFile() === 7;

    this.moveRook(backRank, isKingside);
    this.movePiece(move.getFrom(), move.getTo(), move.getPiece());

    return null;
  }

  protected moveRook(backRank: number, isKingside: boolean): void {
    const rookFrom: IPosition = Position.of(backRank, isKingside ? 8 : 1);
    const rookTo: IPosition = Position.of(backRank, isKingside ? 6 : 4);
    const rook: IPiece | null = this.getPieceAt(rookFrom);
    if (!rook) return;

    this.movePiece(rookFrom, rookTo, rook);
  }
}

export { CastlingMoveExecutor };
