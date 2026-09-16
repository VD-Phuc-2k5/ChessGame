import { Colors, IColor } from '@chess/core';

class WhiteColor implements IColor {
  private static instance: WhiteColor;
  private constructor() {}

  public getColor(): string {
    return Colors.white;
  }

  public getSideName(): string {
    return 'white';
  }

  public static getInstance(): WhiteColor {
    if (!WhiteColor.instance) {
      WhiteColor.instance = new WhiteColor();
    }
    return WhiteColor.instance;
  }
}

export { WhiteColor };
