import { IPosition, PieceSymbolType } from '@chess/core';
import { Position } from '@chess/domain';

const FILE_NUMBERS: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
};

const PROMOTION_FROM_UCI: Record<string, PieceSymbolType> = {
  q: 'QUEEN',
  r: 'ROOK',
  b: 'BISHOP',
  n: 'KNIGHT',
};

const PROMOTION_TO_UCI: Partial<Record<PieceSymbolType, string>> = {
  QUEEN: 'q',
  ROOK: 'r',
  BISHOP: 'b',
  KNIGHT: 'n',
};

interface UciMove {
  from: IPosition;
  to: IPosition;
  promotion?: PieceSymbolType;
}

function uciToMove(uci: string): UciMove {
  const from: IPosition = Position.of(9 - Number(uci[1]), FILE_NUMBERS[uci[0]]);
  const to: IPosition = Position.of(9 - Number(uci[3]), FILE_NUMBERS[uci[2]]);
  const promotionChar: string | undefined = uci[4];
  return {
    from,
    to,
    promotion: promotionChar ? PROMOTION_FROM_UCI[promotionChar] : undefined,
  };
}

export { uciToMove, PROMOTION_TO_UCI };
export type { UciMove };
