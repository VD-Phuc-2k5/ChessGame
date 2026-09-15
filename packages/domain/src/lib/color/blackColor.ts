import { Colors, IColor } from '@chess/core';

class BlackColor implements IColor {
  private static instance: BlackColor;
  private constructor() {}

  public getColor(): string {
    return Colors.black;
  }

  public static getInstance(): BlackColor {
    if (!BlackColor.instance) {
      BlackColor.instance = new BlackColor();
    }
    return BlackColor.instance;
  }
}

export { BlackColor };
