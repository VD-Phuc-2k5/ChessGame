import { ColorType } from '../types/colorType.js';
import { CastlingRightType } from '../types/castlingRightType.js';
import { IPosition } from './iPosition.js';
import { IMove } from './iMove.js';

interface IGameState {
  getCurrentSide(): ColorType;
  toggleSide(): void;
  getCastlingRights(): readonly CastlingRightType[];
  hasCastlingRight(right: CastlingRightType): boolean;
  revokeCastlingRight(right: CastlingRightType): void;
  getEnPassantTarget(): IPosition | null;
  setEnPassantTarget(target: IPosition | null): void;
  pushMove(move: IMove): void;
  popMove(): IMove | undefined;
  reset(): void;
  getMoveHistory(): IMove[];
}

export { IGameState };
