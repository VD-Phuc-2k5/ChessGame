import Image from 'next/image';

import styles from './piece.module.css';

interface PieceProps {
  pieceNotation: string;
}

function Piece({ pieceNotation }: PieceProps) {
  return (
    <Image
      src={`/assets/${pieceNotation}.png`}
      width={30}
      height={30}
      className={`${styles['chess-piece']}`}
      alt={pieceNotation}
    />
  );
}

export default Piece;
