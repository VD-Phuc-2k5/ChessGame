import { Colors } from '../constants/index.js';
import { IColor } from '../interfaces/index.js';

class WhiteColor implements IColor {
  private static instance: WhiteColor;
  private constructor() {}

  public getColor(): string {
    return Colors.white;
  }

  public static getInstance(): WhiteColor {
    if (!WhiteColor.instance) {
      WhiteColor.instance = new WhiteColor();
    }
    return WhiteColor.instance;
  }
}

export { WhiteColor };
