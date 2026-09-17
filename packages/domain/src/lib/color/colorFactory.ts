import { IColor } from '@chess/core';
import { WhiteColor } from './whiteColor.js';
import { BlackColor } from './blackColor.js';

class ColorFactory {
  public static createWhiteColor(): IColor {
    return WhiteColor.getInstance();
  }

  public static createBlackColor(): IColor {
    return BlackColor.getInstance();
  }
}

export { ColorFactory };
