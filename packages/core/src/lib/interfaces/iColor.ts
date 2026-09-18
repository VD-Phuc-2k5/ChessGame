import { ColorType } from '../types/colorType.js';

interface IColor {
  getSideName(): ColorType;
  getColor(): string;
}

export { IColor };
