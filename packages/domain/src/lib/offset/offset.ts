import { OffsetType, Direction } from '@chess/core';

class Offset {
  private static readonly cache: Map<Direction, OffsetType> = new Map();

  static of(direction: Direction): OffsetType {
    const cachedOffset: OffsetType | undefined = Offset.cache.get(direction);
    if (!cachedOffset) {
      throw new Error('Offset for direction ' + direction + ' is not registered.');
    }
    return cachedOffset;
  }

  static register(direction: Direction, offset: OffsetType): void {
    const existing: OffsetType | undefined = Offset.cache.get(direction);
    if (!existing) {
      Offset.cache.set(direction, offset);
    }
  }
}

export { Offset };
