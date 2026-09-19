import { MoveRecord } from './moveHistory.js';

type PgnHeaders = Record<string, string | undefined>;

class PgnBuilder {
  public build(records: MoveRecord[], headers: PgnHeaders, result: string): string {
    const headerLines: string[] = this.buildHeaders(headers);
    const movesText: string = this.buildMovesText(records);

    const lines: string[] = [...headerLines];
    lines.push(movesText ? `${movesText} ${result}` : result);

    return lines.join('\n');
  }

  protected buildHeaders(headers: PgnHeaders): string[] {
    return Object.entries(headers).map(
      ([key, value]: [string, string | undefined]): string => `[${key} "${value}"]`
    );
  }

  protected buildMovesText(records: MoveRecord[]): string {
    const pairs: string[] = [];

    for (let i: number = 0; i < records.length; i += 2) {
      const moveNumber: number = Math.floor(i / 2) + 1;
      let pair: string = `${moveNumber}.`;

      const white: MoveRecord | undefined = records[i];
      if (white) pair += ` ${white.notation}`;

      const black: MoveRecord | undefined = records[i + 1];
      if (black) pair += ` ${black.notation}`;

      pairs.push(pair);
    }

    return pairs.join('  ');
  }
}

export { PgnBuilder, PgnHeaders };
