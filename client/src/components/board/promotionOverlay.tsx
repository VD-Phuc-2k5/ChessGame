'use client';

import Image from 'next/image';

import { ColorType, PieceSymbol, PieceSymbolType } from '@chess/core';
import { JSX } from 'react/jsx-dev-runtime';

interface IPromotionOverlayProps {
  side: ColorType;
  onPromote: (piece: PieceSymbolType) => void;
  onCancel: () => void;
}

const PROMOTION_CHOICES: PieceSymbolType[] = ['QUEEN', 'ROOK', 'BISHOP', 'KNIGHT'];

function PromotionOverlay({ side, onPromote, onCancel }: IPromotionOverlayProps): JSX.Element {
  const prefix: string = side === 'white' ? 'w' : 'b';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-700 bg-gray-900 p-6 text-white shadow-2xl">
        <h2 className="text-lg font-semibold">Phong cấp tốt</h2>
        <div className="flex gap-3">
          {PROMOTION_CHOICES.map((piece: PieceSymbolType): JSX.Element => (
            <button
              key={piece}
              type="button"
              onClick={() => onPromote(piece)}
              className="grid h-16 w-16 cursor-pointer place-items-center rounded-lg bg-gray-700 transition-transform hover:scale-110 hover:bg-gray-600"
            >
              <Image
                src={`/assets/${prefix}${PieceSymbol[piece]}.png`}
                alt={piece}
                width={48}
                height={48}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="text-sm text-gray-400 transition-colors hover:text-gray-200"
          onClick={onCancel}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}

export default PromotionOverlay;
