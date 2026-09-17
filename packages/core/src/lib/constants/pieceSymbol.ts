type PieceSymbolType = 'PAWN' | 'KING' | 'QUEEN' | 'ROOK' | 'BISHOP' | 'KNIGHT';

const PieceSymbol = {
  PAWN: '',
  KING: 'K',
  QUEEN: 'Q',
  ROOK: 'R',
  BISHOP: 'B',
  KNIGHT: 'N',
} as const;

export { PieceSymbol, PieceSymbolType };
