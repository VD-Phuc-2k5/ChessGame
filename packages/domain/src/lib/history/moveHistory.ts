import { IMove, ColorType, PieceSymbol } from '@chess/core';

type CheckStatus = 'none' | 'check' | 'checkmate';

interface MoveRecord {
  moveNumber: number;
  side: ColorType;
  notation: string;
  uci: string;
}

class MoveHistory {
  private records: MoveRecord[] = [];

  public record(move: IMove, baseNotation: string, status: CheckStatus): void {
    const moveNumber: number = Math.floor(this.records.length / 2) + 1;
    const notation: string = baseNotation + this.getCheckSuffix(status);
    this.records.push({
      moveNumber,
      side: move.getPiece().getSide(),
      notation,
      uci: this.toUci(move),
    });
  }

  public getRecords(): MoveRecord[] {
    return [...this.records];
  }

  public reset(): void {
    this.records = [];
  }

  protected getCheckSuffix(status: CheckStatus): string {
    if (status === 'checkmate') return '#';
    if (status === 'check') return '+';
    return '';
  }

  protected toUci(move: IMove): string {
    let uci: string = move.getFrom().toString() + move.getTo().toString();
    if (move.getType() === 'PROMOTION') {
      uci += PieceSymbol[move.getPromotionPiece() ?? 'QUEEN'].toLowerCase();
    }
    return uci;
  }
}

export { MoveHistory, CheckStatus, MoveRecord };
