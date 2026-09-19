import {
  IBoard,
  IGameState,
  IMove,
  IPiece,
  IPosition,
  ColorType,
  PieceSymbolType,
} from '@chess/core';
import { Board } from '../board/board.js';
import { GameState } from './gameState.js';
import { GameStateUpdater } from './gameStateUpdater.js';
import { MoveGenerator } from '../move/moveGenerator.js';
import { MoveValidator } from '../move/moveValidator.js';
import { MoveExecutorFactory } from '../execution/moveExecutorFactory.js';
import { MoveNotationBuilder } from '../history/moveNotationBuilder.js';
import { MoveHistory, CheckStatus, MoveRecord } from '../history/moveHistory.js';
import { PgnBuilder, PgnHeaders } from '../history/pgnBuilder.js';

type GameResult = '1-0' | '0-1' | '1/2-1/2' | null;

class Game {
  private readonly board: IBoard = Board.getBoardInstance();
  private readonly gameState: IGameState = GameState.getInstance();
  private readonly generator: MoveGenerator = MoveGenerator.getInstance();
  private readonly validator: MoveValidator = MoveValidator.getInstance();
  private readonly executorFactory: MoveExecutorFactory = new MoveExecutorFactory();
  private readonly stateUpdater: GameStateUpdater = new GameStateUpdater();
  private readonly notationBuilder: MoveNotationBuilder;
  private readonly history: MoveHistory = new MoveHistory();
  private readonly pgnBuilder: PgnBuilder = new PgnBuilder();
  private result: GameResult = null;

  constructor() {
    this.notationBuilder = new MoveNotationBuilder(this.board, this.validator);
  }

  public makeMove(
    from: IPosition,
    to: IPosition,
    promotion: PieceSymbolType | null = null
  ): boolean {
    if (this.result) return false;

    const piece: IPiece | null = this.board.getCell(from)?.getPiece() ?? null;
    if (!piece || piece.getSide() !== this.gameState.getCurrentSide()) return false;

    const move: IMove | null = this.findLegalMove(piece, from, to, promotion);
    if (!move) return false;

    const baseNotation: string = this.notationBuilder.buildBase(move);
    const captured: IPiece | null = this.executorFactory
      .createExecutor(move, this.board)
      .execute(move);

    this.stateUpdater.update(this.gameState, move, captured);

    const opponent: ColorType = this.gameState.getCurrentSide();
    const status: CheckStatus = this.computeCheckStatus(opponent);
    this.history.record(move, baseNotation, status);
    this.updateResult(status, opponent);

    return true;
  }

  public getLegalMoves(from: IPosition): IMove[] {
    const piece: IPiece | null = this.board.getCell(from)?.getPiece() ?? null;
    if (!piece) return [];
    if (piece.getSide() !== this.gameState.getCurrentSide()) return [];

    return this.generator
      .generate(piece)
      .filter((move: IMove): boolean => this.validator.isValidMove(move));
  }

  public getCurrentSide(): ColorType {
    return this.gameState.getCurrentSide();
  }

  public isGameOver(): boolean {
    return this.result !== null;
  }

  public getResult(): GameResult {
    return this.result;
  }

  public getPgn(headers: PgnHeaders = {}): string {
    const result: string = this.result ?? '*';
    return this.pgnBuilder.build(this.history.getRecords(), headers, result);
  }

  public getMoveCount(): number {
    return this.history.getRecords().length;
  }

  public getMoveRecords(): MoveRecord[] {
    return this.history.getRecords();
  }

  public getUciMoves(): string[] {
    return this.history.getRecords().map((record: MoveRecord): string => record.uci);
  }

  public reset(): void {
    this.board.reset();
    this.gameState.reset();
    this.history.reset();
    this.result = null;
  }

  protected findLegalMove(
    piece: IPiece,
    from: IPosition,
    to: IPosition,
    promotion: PieceSymbolType | null = null
  ): IMove | null {
    for (const move of this.generator.generate(piece)) {
      if (move.getTo().toString() !== to.toString()) continue;
      if (move.getType() === 'PROMOTION' && move.getPromotionPiece() !== promotion) continue;
      if (this.validator.isValidMove(move)) return move;
    }
    return null;
  }

  protected computeCheckStatus(side: ColorType): CheckStatus {
    if (!this.validator.isInCheck(side)) return 'none';
    return this.hasAnyLegalMove(side) ? 'check' : 'checkmate';
  }

  protected updateResult(status: CheckStatus, side: ColorType): void {
    if (status === 'checkmate') {
      this.result = side === 'white' ? '0-1' : '1-0';
      return;
    }

    if (status === 'none' && !this.hasAnyLegalMove(side)) {
      this.result = '1/2-1/2';
    }
  }

  protected hasAnyLegalMove(side: ColorType): boolean {
    for (const cell of this.board) {
      const piece: IPiece | null = cell.getPiece();
      if (!piece || piece.getSide() !== side) continue;

      for (const move of this.generator.generate(piece)) {
        if (this.validator.isValidMove(move)) return true;
      }
    }
    return false;
  }
}

export { Game, GameResult };
