import { PlayerMode } from '@/game/playerStrategy';
import { ICell, IPosition, PieceSymbolType } from '@chess/core';
import { MoveRecord } from '@chess/domain';

export interface IBoardRenderInfo {
  size: number;
  cells: ICell[];
  files: string[];
  ranks: string[];
}

export interface IBoardInfos extends IBoardRenderInfo {
  selected: string | null;
  legalTargets: string[];
  currentSide: string;
  result: string | null;
  isGameOver: boolean;
  lastIllegal: string | null;
  whiteTime: number;
  blackTime: number;
  moves: MoveRecord[];
  playerMode: PlayerMode;
  engineThinking: boolean;
  engineMoveTime: number;
  pendingPromotion: boolean;
  onSelectCell: (position: IPosition) => void;
  onDragStart: (position: IPosition) => void;
  onDragEnd: () => void;
  onDrop: (position: IPosition) => void;
  onNewGame: () => void;
  onSetPlayerMode: (mode: PlayerMode) => void;
  onSetEngineMoveTime: (ms: number) => void;
  onPromote: (piece: PieceSymbolType) => void;
  onCancelPromotion: () => void;
}
