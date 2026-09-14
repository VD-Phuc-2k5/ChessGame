import { getPositionFromCoords, moveFrom } from './index.js';

describe('core board geometry', () => {
  it('converts coordinates to a board position', () => {
    expect(getPositionFromCoords(6, 4)).toBe(52);
  });

  it('rejects a move that leaves the board', () => {
    expect(moveFrom(0, 'up')).toBe(-1);
  });
});
