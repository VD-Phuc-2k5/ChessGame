import { ICell } from '@chess/core';

export interface IBoardInfos {
  size: number;
  cells: ICell[];
  files: string[];
  ranks: string[];
}
