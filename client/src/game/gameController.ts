import { ColorType, IPosition, PieceSymbolType } from '@chess/core';
import { Game, GameResult, MoveRecord } from '@chess/domain';

import { GameClock } from './gameClock';
import { EnginePlayer, HumanPlayer, IPlayerStrategy, PlayerMode } from './playerStrategy';
import { StockfishEngine } from './stockfishEngine';

interface PendingPromotion {
  from: IPosition;
  to: IPosition;
}

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
  pendingPromotion: PendingPromotion | null;
  playerMode: PlayerMode;
  engineThinking: boolean;
  engineMoveTime: number;
}

class GameController {
  private readonly game: Game = new Game();
  private readonly clock: GameClock = new GameClock();
  private readonly engine: StockfishEngine = new StockfishEngine();
  private readonly listeners: Set<() => void> = new Set();
  private flashTimeout: ReturnType<typeof setTimeout> | null = null;
  private snapshot: GameSnapshot;
  private engineRequestId: number = 0;

  private humanSide: ColorType = 'white';
  private playerMode: PlayerMode = 'human';
  private engineMoveTimeMs: number = 500;

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
    if (this.humanSide === side) return;
    this.humanSide = side;
    this.reset();
  }

  public getHumanSide(): ColorType {
    return this.humanSide;
  }

  public setPlayerMode(mode: PlayerMode): void {
    if (this.playerMode === mode) return;
    this.playerMode = mode;
    this.reset();
  }

  public setEngineMoveTime(ms: number): void {
    this.engineMoveTimeMs = ms;
    this.snapshot = { ...this.snapshot, engineMoveTime: ms };
    this.notify();
  }

  public selectSquare(position: IPosition): void {
    if (this.snapshot.pendingPromotion || this.isEngineTurn()) return;
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
    if (this.isPromotionMove(from, to)) {
      this.snapshot = { ...this.snapshot, pendingPromotion: { from, to } };
      this.notify();
      return true;
    }
    return this.executeMove(from, to, null);
  }

  public promote(piece: PieceSymbolType): void {
    const pending: PendingPromotion | null = this.snapshot.pendingPromotion;
    if (!pending) return;
    this.snapshot = { ...this.snapshot, pendingPromotion: null };
    this.notify();
    this.executeMove(pending.from, pending.to, piece);
  }

  public cancelPromotion(): void {
    if (!this.snapshot.pendingPromotion) return;
    this.snapshot = { ...this.snapshot, pendingPromotion: null };
    this.notify();
  }

  public clearSelection(): void {
    this.snapshot = { ...this.snapshot, selected: null, dragging: null, legalTargets: [] };
    this.notify();
  }

  public startDrag(position: IPosition): void {
    if (this.snapshot.pendingPromotion || this.isEngineTurn()) return;
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
    this.engineRequestId += 1;
    this.engine.stop();
    this.game.reset();
    this.clock.reset();
    this.clock.start(this.game.getCurrentSide());
    this.snapshot = this.buildSnapshot();
    this.notify();
    this.scheduleEngineMove();
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

  protected isPromotionMove(from: IPosition, to: IPosition): boolean {
    return this.game
      .getLegalMoves(from)
      .some((move) => move.getTo().toString() === to.toString() && move.getType() === 'PROMOTION');
  }

  protected executeMove(
    from: IPosition,
    to: IPosition,
    promotion: PieceSymbolType | null
  ): boolean {
    const made: boolean = this.game.makeMove(from, to, promotion);
    if (!made) {
      this.flashIllegal(to);
      return false;
    }

    this.clock.swap(this.game.getCurrentSide());
    this.clearSelection();
    this.notify();
    this.scheduleEngineMove();
    return true;
  }

  protected scheduleEngineMove(): void {
    const side: ColorType = this.game.getCurrentSide();
    if (this.game.isGameOver() || this.playerMode !== 'engine' || side === this.humanSide) return;

    const requestId: number = ++this.engineRequestId;
    const player: IPlayerStrategy = this.createPlayer(side);
    if (!(player instanceof EnginePlayer)) return;

    this.snapshot = { ...this.snapshot, engineThinking: true };
    this.notify();

    player
      .computeMove()
      .then((move) => {
        if (
          requestId !== this.engineRequestId ||
          this.game.getCurrentSide() !== side ||
          this.game.isGameOver() ||
          !this.isEngineTurn()
        ) {
          return;
        }
        this.snapshot = { ...this.snapshot, engineThinking: false };
        this.notify();
        if (!move) return;
        this.executeMove(move.from, move.to, move.promotion ?? null);
      })
      .catch(() => {
        if (requestId !== this.engineRequestId) return;
        this.snapshot = { ...this.snapshot, engineThinking: false };
        this.notify();
      });
  }

  protected isEngineTurn(): boolean {
    return this.playerMode === 'engine' && this.game.getCurrentSide() !== this.humanSide;
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
      pendingPromotion: null,
      playerMode: this.playerMode,
      engineThinking: false,
      engineMoveTime: this.engineMoveTimeMs,
    };
  }

  protected createPlayer(side: ColorType): IPlayerStrategy {
    const isEngine: boolean = this.playerMode === 'engine' && side !== this.humanSide;
    if (isEngine) {
      return new EnginePlayer(
        side,
        this.engine,
        () => this.game.getUciMoves(),
        this.engineMoveTimeMs
      );
    }
    return new HumanPlayer(side);
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
export type { GameSnapshot, PendingPromotion };
