export type Coordinates = {
  x: number;
  y: number;
};

export type Direction =
  'up' | 'upLeft' | 'upRight' | 'down' | 'downLeft' | 'downRight' | 'left' | 'right';

export const MoveVectors: Record<Direction, Coordinates> = {
  up: { x: -1, y: 0 },
  upLeft: { x: -1, y: -1 },
  upRight: { x: -1, y: 1 },
  down: { x: 1, y: 0 },
  downLeft: { x: 1, y: -1 },
  downRight: { x: 1, y: 1 },
  left: { x: 0, y: -1 },
  right: { x: 0, y: 1 },
};

export function getColumnIndex(position: number): number {
  return position % 8;
}

export function getRowIndex(position: number): number {
  return Math.floor(position / 8);
}

export function getPositionFromCoords(row: number, column: number): number {
  return row * 8 + column;
}

export function moveFrom(position: number, direction: Direction, step = 1): number {
  if (position === -1 || !step) return -1;

  const { x, y } = MoveVectors[direction];
  const newRow = getRowIndex(position) + step * x;
  const newColumn = getColumnIndex(position) + step * y;
  const isValid = newRow >= 0 && newRow <= 7 && newColumn >= 0 && newColumn <= 7;

  return isValid ? getPositionFromCoords(newRow, newColumn) : -1;
}
