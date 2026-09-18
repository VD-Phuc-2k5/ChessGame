import { RANKS, FILES, IPosition } from '@chess/core';

class Position implements IPosition {
  private static readonly cache: Map<string, Position> = new Map();

  private constructor(
    private readonly rank: number,
    private readonly file: number
  ) {
    this.validate();
  }

  public static of(rank: number, file: number): Position {
    const key = `${rank},${file}`;
    let position: Position | undefined = Position.cache.get(key);
    if (!position) {
      position = new Position(rank, file);
      Position.cache.set(key, position);
    }
    return position;
  }

  public getRank(): number {
    return this.rank;
  }

  public getFile(): number {
    return this.file;
  }

  public toString(): string {
    return `${RANKS.get(this.rank)}${FILES.get(this.file)}`;
  }

  private validate(): void {
    if (!RANKS.has(this.rank) || !FILES.has(this.file)) {
      throw new Error(`Invalid position: rank=${this.rank}, file=${this.file}`);
    }
  }
}

export { Position };
