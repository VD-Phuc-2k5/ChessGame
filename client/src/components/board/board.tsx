'use client';

import { JSX, ReactNode, RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { BoardContext } from '@/context/BoardContext';
import { IBoardInfos } from '@/interfaces/iboardInfo';

import { BoardOrientation } from '@/components/board/boardOrientation';
import { Orientation } from '@/components/board/boardOrientationControls';

import { getBoardInfos } from '@/utils/getBoardInfos';

import { BoardFiles } from './boardFiles';
import { BoardGrid } from './boardGrid';
import { BoardRanks } from './boardRanks';

interface IBoardRootProps {
  children: ReactNode;
}

function BoardRoot({ children }: IBoardRootProps): JSX.Element {
  const [side, setSide] = useState<Orientation>('white');
  const boardRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const info: IBoardInfos = useMemo((): IBoardInfos => getBoardInfos(side), [side]);

  const handleRotate: (orientation: Orientation) => void = useCallback(
    (orientation: Orientation): void => {
      setSide(orientation);
    },
    []
  );

  return (
    <BoardContext.Provider value={info}>
      <section className="flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div style={{ perspective: '1000px' }}>
          <div ref={boardRef} className="flex flex-col items-end will-change-transform">
            {children}
          </div>
        </div>
        <BoardOrientation boardRef={boardRef} orientation={side} onRotate={handleRotate} />
      </section>
    </BoardContext.Provider>
  );
}

const Board: typeof BoardRoot & {
  Files: typeof BoardFiles;
  Ranks: typeof BoardRanks;
  Grid: typeof BoardGrid;
} = Object.assign(BoardRoot, {
  Files: BoardFiles,
  Ranks: BoardRanks,
  Grid: BoardGrid,
});

export { Board };
