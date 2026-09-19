import { ColorType, IPosition, PieceSymbolType } from '@chess/core';

import { StockfishEngine } from './stockfishEngine';
import { uciToMove } from './uci';

interface PlayerMove {
  from: IPosition;
  to: IPosition;
  promotion?: PieceSymbolType;
}

interface IPlayerStrategy {
  readonly side: ColorType;
  readonly name: string;
  computeMove(): Promise<PlayerMove | null>;
}

class HumanPlayer implements IPlayerStrategy {
  public readonly name: string = 'Human';

  constructor(public readonly side: ColorType) {}

  public async computeMove(): Promise<PlayerMove | null> {
    return null;
  }
}

class EnginePlayer implements IPlayerStrategy {
  public readonly name: string = 'Stockfish';

  constructor(
    public readonly side: ColorType,
    private readonly engine: StockfishEngine,
    private readonly getUciMoves: () => string[],
    private readonly moveTimeMs: number
  ) {}

  public async computeMove(): Promise<PlayerMove | null> {
    const best: string | null = await this.engine.computeMove(this.getUciMoves(), this.moveTimeMs);
    return best ? uciToMove(best) : null;
  }
}

type PlayerMode = 'human' | 'engine';

export { HumanPlayer, EnginePlayer };
export type { IPlayerStrategy, PlayerMove, PlayerMode };
