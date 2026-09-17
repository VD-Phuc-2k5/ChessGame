import { ICell } from '@chess/core';

export interface IBoardInfos {
  cells: ICell[];
  files: string[];
  ranks: string[];
}
