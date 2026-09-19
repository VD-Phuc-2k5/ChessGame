import { ColorType, IPosition } from '@chess/core';
import { Game, GameResult, MoveRecord } from '@chess/domain';

import { GameClock } from './gameClock';
import { IPlayerStrategy, PlayerMode, PlayerStrategyFactory } from './playerStrategy';

interface GameSnapshot {
  selected: IPosition | null;
  dragging: IPosition | null;
  legalTargets: string[];
  currentSide: ColorType;
  result: GameResult;
  isGameOver: boolean;
  lastIllegal: string | null;
  whiteTime: number;
  blackTime: number;
  moveRecords: MoveRecord[];
  players: Record<ColorType, IPlayerStrategy>;
}

class GameController {
  private readonly game: Game = new Game();
  private readonly clock: GameClock = new GameClock();
  private readonly listeners: Set<() => void> = new Set();
  private flashTimeout: ReturnType<typeof setTimeout> | null = null;
  private snapshot: GameSnapshot;

  private humanSide: ColorType = 'white';

  constructor() {
    this.snapshot = this.buildSnapshot();
    this.clock.setOnTick(() => this.notify());
    this.clock.start(this.game.getCurrentSide());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getSnapshot(): GameSnapshot {
    return this.snapshot;
  }

  public setHumanSide(side: ColorType): void {
    this.humanSide = side;
    this.notify();
  }

  public getHumanSide(): ColorType {
    return this.humanSide;
  }

  public selectSquare(position: IPosition): void {
    if (this.snapshot.selected === null) {
      this.trySelect(position);
      return;
    }

    if (position.toString() === this.snapshot.selected.toString()) {
      this.clearSelection();
      return;
    }

    if (this.snapshot.legalTargets.includes(position.toString())) {
      this.tryMove(this.snapshot.selected, position);
      return;
    }

    this.trySelect(position);
  }

  public tryMove(from: IPosition, to: IPosition): boolean {
    const made: boolean = this.game.makeMove(from, to);
    if (!made) {
      this.flashIllegal(to);
      return false;
    }

    this.clock.swap(this.game.getCurrentSide());
    this.clearSelection();
    this.notify();
    return true;
  }

  public clearSelection(): void {
    this.snapshot = { ...this.snapshot, selected: null, dragging: null, legalTargets: [] };
    this.notify();
  }

  public startDrag(position: IPosition): void {
    const targets: string[] = this.game
      .getLegalMoves(position)
      .map((move) => move.getTo().toString());
    this.snapshot = {
      ...this.snapshot,
      selected: position,
      dragging: position,
      legalTargets: targets,
    };
    this.notify();
  }

  public endDrag(): void {
    this.snapshot = { ...this.snapshot, dragging: null };
    this.notify();
  }

  public drop(position: IPosition): void {
    const dragging: IPosition | null = this.snapshot.dragging;
    this.endDrag();
    if (dragging) this.tryMove(dragging, position);
  }

  public reset(): void {
    this.game.reset();
    this.clock.reset();
    this.clock.start(this.game.getCurrentSide());
    this.snapshot = this.buildSnapshot();
    this.notify();
  }

  public getPgn(headers: Record<string, string | undefined> = {}): string {
    return this.game.getPgn(headers);
  }

  protected trySelect(position: IPosition): void {
    const targets: string[] = this.game
      .getLegalMoves(position)
      .map((move) => move.getTo().toString());
    this.snapshot = {
      ...this.snapshot,
      selected: targets.length > 0 ? position : null,
      legalTargets: targets,
    };
    this.notify();
  }

  protected flashIllegal(position: IPosition): void {
    this.snapshot = { ...this.snapshot, lastIllegal: position.toString() };
    this.notify();

    if (this.flashTimeout) clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(() => {
      this.snapshot = { ...this.snapshot, lastIllegal: null };
      this.notify();
    }, 600);
  }

  protected buildSnapshot(): GameSnapshot {
    return {
      selected: null,
      dragging: null,
      legalTargets: [],
      currentSide: this.game.getCurrentSide(),
      result: this.game.getResult(),
      isGameOver: this.game.isGameOver(),
      lastIllegal: null,
      whiteTime: this.clock.getWhiteTime(),
      blackTime: this.clock.getBlackTime(),
      moveRecords: this.game.getMoveRecords(),
      players: {
        white: PlayerStrategyFactory.create('white', this.getPlayerMode()),
        black: PlayerStrategyFactory.create('black', this.getPlayerMode()),
      },
    };
  }

  protected getPlayerMode(): PlayerMode {
    return 'human';
  }

  protected notify(): void {
    this.snapshot = {
      ...this.snapshot,
      currentSide: this.game.getCurrentSide(),
      result: this.game.getResult(),
      isGameOver: this.game.isGameOver(),
      whiteTime: this.clock.getWhiteTime(),
      blackTime: this.clock.getBlackTime(),
      moveRecords: this.game.getMoveRecords(),
    };
    for (const listener of this.listeners) listener();
  }
}

export { GameController };
export type { GameSnapshot };
