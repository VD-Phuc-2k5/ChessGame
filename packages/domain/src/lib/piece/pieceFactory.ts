import { IColor, IPiece, ColorType, PieceSymbolType } from '@chess/core';
import { ColorFactory } from '../color/colorFactory.js';
import { Pawn } from './pawn.js';
import { Rook } from './rook.js';
import { Knight } from './knight.js';
import { Bishop } from './bishop.js';
import { Queen } from './queen.js';
import { King } from './king.js';

class PieceFactory {
  private static whiteColor: IColor = ColorFactory.createWhiteColor();
  private static blackColor: IColor = ColorFactory.createBlackColor();

  static createPiece(side: ColorType, type: PieceSymbolType): IPiece {
    const color: IColor = side === 'white' ? PieceFactory.whiteColor : PieceFactory.blackColor;
    switch (type) {
      case 'ROOK':
        return new Rook(color);
      case 'BISHOP':
        return new Bishop(color);
      case 'KNIGHT':
        return new Knight(color);
      default:
        return new Queen(color);
    }
  }

  static createWhitePawn(): IPiece {
    return new Pawn(PieceFactory.whiteColor);
  }

  static createBlackPawn(): IPiece {
    return new Pawn(PieceFactory.blackColor);
  }

  static createWhiteRook(): IPiece {
    return new Rook(PieceFactory.whiteColor);
  }

  static createBlackRook(): IPiece {
    return new Rook(PieceFactory.blackColor);
  }

  static createWhiteKnight(): IPiece {
    return new Knight(PieceFactory.whiteColor);
  }

  static createBlackKnight(): IPiece {
    return new Knight(PieceFactory.blackColor);
  }

  static createWhiteBishop(): IPiece {
    return new Bishop(PieceFactory.whiteColor);
  }

  static createBlackBishop(): IPiece {
    return new Bishop(PieceFactory.blackColor);
  }

  static createWhiteQueen(): IPiece {
    return new Queen(PieceFactory.whiteColor);
  }

  static createBlackQueen(): IPiece {
    return new Queen(PieceFactory.blackColor);
  }

  static createWhiteKing(): IPiece {
    return new King(PieceFactory.whiteColor);
  }

  static createBlackKing(): IPiece {
    return new King(PieceFactory.blackColor);
  }
}

export { PieceFactory };
