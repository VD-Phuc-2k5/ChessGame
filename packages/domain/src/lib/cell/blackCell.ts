import { Cell } from './cell.js';
import { ColorFactory } from '../color/index.js';

class BlackCell extends Cell {
  applyColor(): void {
    this.color = ColorFactory.createBlackColor();
  }
}

export { BlackCell };
