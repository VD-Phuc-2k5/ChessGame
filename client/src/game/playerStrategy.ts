import { ColorType, IMove } from '@chess/core';

interface IPlayerStrategy {
  readonly side: ColorType;
  readonly name: string;
  computeMove(): IMove | null;
}

class HumanPlayer implements IPlayerStrategy {
  public readonly name: string = 'Human';

  constructor(public readonly side: ColorType) {}

  public computeMove(): IMove | null {
    return null;
  }
}

class EnginePlayer implements IPlayerStrategy {
  public readonly name: string = 'Engine';

  constructor(public readonly side: ColorType) {}

  public computeMove(): IMove | null {
    return null;
  }
}

type PlayerMode = 'human' | 'engine';

class PlayerStrategyFactory {
  public static create(side: ColorType, mode: PlayerMode): IPlayerStrategy {
    return mode === 'engine' ? new EnginePlayer(side) : new HumanPlayer(side);
  }
}

export { HumanPlayer, EnginePlayer, PlayerStrategyFactory };
export type { IPlayerStrategy, PlayerMode };
