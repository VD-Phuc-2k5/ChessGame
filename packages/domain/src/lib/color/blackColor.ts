import { Colors, IColor, ColorType } from '@chess/core';

class BlackColor implements IColor {
  private static instance: BlackColor;
  private constructor() {}

  public getColor(): string {
    return Colors.black;
  }

  public getSideName(): ColorType {
    return 'black';
  }

  public static getInstance(): BlackColor {
    if (!BlackColor.instance) {
      BlackColor.instance = new BlackColor();
    }
    return BlackColor.instance;
  }
}

export { BlackColor };
