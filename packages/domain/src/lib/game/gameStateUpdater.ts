import { IGameState, IMove, IPiece, IPosition, CastlingRightType } from '@chess/core';
import { Position } from '../position/position.js';

class GameStateUpdater {
  public update(gameState: IGameState, move: IMove, captured: IPiece | null): void {
    this.updateEnPassantTarget(gameState, move);
    this.updateCastlingRights(gameState, move, captured);
    gameState.toggleSide();
    gameState.pushMove(move);
  }

  protected updateEnPassantTarget(gameState: IGameState, move: IMove): void {
    const piece: IPiece = move.getPiece();
    const from: IPosition = move.getFrom();
    const to: IPosition = move.getTo();

    if (piece.getType() !== 'PAWN' || Math.abs(to.getRank() - from.getRank()) !== 2) {
      gameState.setEnPassantTarget(null);
      return;
    }

    const direction: number = piece.getSide() === 'white' ? -1 : 1;
    const middlePosition: IPosition = Position.of(from.getRank() + direction, from.getFile());
    gameState.setEnPassantTarget(middlePosition);
  }

  protected updateCastlingRights(
    gameState: IGameState,
    move: IMove,
    captured: IPiece | null
  ): void {
    this.revokeRightsFromKingMove(gameState, move);
    this.revokeRightFromRookMove(gameState, move);
    this.revokeRightFromCapturedRook(gameState, move, captured);
  }

  protected revokeRightsFromKingMove(gameState: IGameState, move: IMove): void {
    const piece: IPiece = move.getPiece();
    if (piece.getType() !== 'KING') return;

    if (piece.getSide() === 'white') {
      gameState.revokeCastlingRight('K');
      gameState.revokeCastlingRight('Q');
    } else {
      gameState.revokeCastlingRight('k');
      gameState.revokeCastlingRight('q');
    }
  }

  protected revokeRightFromRookMove(gameState: IGameState, move: IMove): void {
    const piece: IPiece = move.getPiece();
    if (piece.getType() !== 'ROOK') return;

    const fromSquare: string = move.getFrom().toString();
    const right: CastlingRightType | null = this.getRightForCorner(fromSquare);
    if (right) gameState.revokeCastlingRight(right);
  }

  protected revokeRightFromCapturedRook(
    gameState: IGameState,
    move: IMove,
    captured: IPiece | null
  ): void {
    if (!captured || captured.getType() !== 'ROOK') return;

    const toSquare: string = move.getTo().toString();
    const right: CastlingRightType | null = this.getRightForCorner(toSquare);
    if (right) gameState.revokeCastlingRight(right);
  }

  protected getRightForCorner(square: string): CastlingRightType | null {
    switch (square) {
      case 'a1':
        return 'Q';
      case 'h1':
        return 'K';
      case 'a8':
        return 'q';
      case 'h8':
        return 'k';
      default:
        return null;
    }
  }
}

export { GameStateUpdater };
