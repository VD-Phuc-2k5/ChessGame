import { CBoard, CCell, PieceColor, PieceType } from './index.js';

describe('domain chess model', () => {
  it('creates the standard 64-cell initial board', () => {
    const board = CBoard.initialBoard();

    expect(board).toHaveLength(64);
    expect(board[0].Piece).toEqual({
      pieceColor: PieceColor.Black,
      pieceType: PieceType.Rook,
    });
    expect(board[52].Piece?.pieceType).toBe(PieceType.Pawn);
  });

  it('formats a cell notation', () => {
    expect(
      new CCell(0, {
        pieceColor: PieceColor.White,
        pieceType: PieceType.King,
      }).getPieceNotation()
    ).toBe('wK');
  });
});
