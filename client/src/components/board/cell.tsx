import { JSX, memo } from 'react';

import Image from 'next/image';

import { IPiece } from '@chess/core';

interface CellComponentProps {
  color: string;
  coordinate: string;
  piece: IPiece | null;
}

function CellComponent(props: CellComponentProps): JSX.Element {
  const symbol: string | null = props.piece ? props.piece.toSymbol() : null;
  const imgSrc: string | null = symbol ? `/assets/${symbol}.png` : null;
  return (
    <div style={{ backgroundColor: props.color }} className="grid h-full w-full place-items-center">
      {imgSrc && <Image src={imgSrc} alt={imgSrc} width={40} height={40} priority />}
    </div>
  );
}

export default memo(CellComponent);
