import { Cell } from './cell.js';
import { ColorFactory } from '../color/index.js';

class WhiteCell extends Cell {
  applyColor(): void {
    this.color = ColorFactory.createWhiteColor();
  }
}

export { WhiteCell };
