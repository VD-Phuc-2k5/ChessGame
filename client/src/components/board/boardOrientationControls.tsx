import { JSX } from 'react';

import Image from 'next/image';

export type Orientation = 'white' | 'black';

interface IBoardOrientationControlsProps {
  orientation: Orientation;
  onRotate: (target: Orientation) => void;
}

function BoardOrientationControls({
  orientation,
  onRotate,
}: IBoardOrientationControlsProps): JSX.Element {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      <button
        type="button"
        onClick={() => onRotate('black')}
        aria-label="Rotate to black side"
        className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-white/40 bg-black text-white shadow-lg transition-transform hover:scale-110 ${
          orientation === 'black' ? 'ring-2 ring-white' : ''
        }`}
      >
        <Image src="/assets/wP.png" alt="" width={18} height={18} />
      </button>
      <button
        type="button"
        onClick={() => onRotate('white')}
        aria-label="Rotate to white side"
        className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full border-2 border-black/40 bg-white text-black shadow-lg transition-transform hover:scale-110 ${
          orientation === 'white' ? 'ring-2 ring-black' : ''
        }`}
      >
        <Image src="/assets/bP.png" alt="" width={18} height={18} />
      </button>
    </div>
  );
}

export { BoardOrientationControls };
