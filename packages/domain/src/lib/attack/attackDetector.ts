import { IBoard, IPiece, IPosition, ColorType } from '@chess/core';
import { MoveGenerator } from '../move/moveGenerator.js';

class AttackDetector {
  constructor(
    private readonly generator: MoveGenerator,
    private readonly board: IBoard
  ) {}

  public isInCheck(side: ColorType): boolean {
    const kingPosition: IPosition | null = this.findKingPosition(side);
    if (!kingPosition) return false;
    return this.isSquareAttacked(kingPosition, side);
  }

  public isSquareAttacked(square: IPosition, side: ColorType): boolean {
    for (const cell of this.board) {
      const enemy: IPiece | null = cell.getPiece();
      if (!enemy || enemy.getSide() === side) continue;

      for (const move of this.generator.generate(enemy)) {
        if (move.getTo().toString() === square.toString()) {
          return true;
        }
      }
    }

    return false;
  }

  public findKingPosition(side: ColorType): IPosition | null {
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

export { AttackDetector };
