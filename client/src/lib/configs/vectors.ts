export type Coordinates = {
  x: number;
  y: number;
};

export const MoveVectors: Record<string, Coordinates> = {
  up: { x: -1, y: 0 },
  upLeft: { x: -1, y: -1 },
  upRight: { x: -1, y: 1 },
  down: { x: 1, y: 0 },
  downLeft: { x: 1, y: -1 },
  downRight: { x: 1, y: 1 },
  left: { x: 0, y: -1 },
  right: { x: 0, y: 1 },
};
