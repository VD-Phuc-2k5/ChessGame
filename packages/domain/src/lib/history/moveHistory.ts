import { IMove, ColorType } from '@chess/core';

type CheckStatus = 'none' | 'check' | 'checkmate';

interface MoveRecord {
  moveNumber: number;
  side: ColorType;
  notation: string;
}

class MoveHistory {
  private records: MoveRecord[] = [];

  public record(move: IMove, baseNotation: string, status: CheckStatus): void {
    const moveNumber: number = Math.floor(this.records.length / 2) + 1;
    const notation: string = baseNotation + this.getCheckSuffix(status);
    this.records.push({ moveNumber, side: move.getPiece().getSide(), notation });
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
}

export { MoveHistory, CheckStatus, MoveRecord };
