import { IGameState, IPosition, IMove, ColorType, CastlingRightType } from '@chess/core';

class GameState implements IGameState {
  private static instance: GameState | null = null;
  private currentSide!: ColorType;
  private castlingRights!: CastlingRightType[];
  private enPassantTarget!: IPosition | null;
  private moveHistory!: IMove[];

  constructor() {
    this.reset();
  }

  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  public reset(): void {
    this.currentSide = 'white';
    this.castlingRights = ['K', 'Q', 'k', 'q'];
    this.enPassantTarget = null;
    this.moveHistory = [];
  }

  public toggleSide(): void {
    this.currentSide = this.currentSide === 'white' ? 'black' : 'white';
  }

  public getCurrentSide(): ColorType {
    return this.currentSide;
  }

  public getCastlingRights(): readonly CastlingRightType[] {
    return [...this.castlingRights];
  }

  public getEnPassantTarget(): IPosition | null {
    return this.enPassantTarget;
  }

  public setEnPassantTarget(target: IPosition | null): void {
    this.enPassantTarget = target;
  }

  public getMoveHistory(): IMove[] {
    return this.moveHistory;
  }

  public hasCastlingRight(right: CastlingRightType): boolean {
    return this.castlingRights.includes(right);
  }

  public revokeCastlingRight(right: CastlingRightType): void {
    const index: number = this.castlingRights.indexOf(right);
    if (index !== -1) {
      this.castlingRights.splice(index, 1);
    }
  }

  public pushMove(move: IMove): void {
    this.moveHistory.push(move);
  }

  public popMove(): IMove | undefined {
    return this.moveHistory.pop();
  }
}

export { GameState };
