'use client';

import { JSX, ReactNode, RefObject, useCallback, useMemo, useRef, useState } from 'react';

import { BoardContext } from '@/context/BoardContext';
import { GameController } from '@/game/gameController';
import { useGameController } from '@/game/useGameController';
import { IBoardInfos } from '@/interfaces/iboardInfo';

import { BoardOrientation } from '@/components/board/boardOrientation';
import { Orientation } from '@/components/board/boardOrientationControls';

import { getBoardInfos } from '@/utils/getBoardInfos';

import { BoardFiles } from './boardFiles';
import { BoardGrid } from './boardGrid';
import { BoardRanks } from './boardRanks';
import GameOverlay from './gameOverlay';

interface IBoardRootProps {
  children: ReactNode;
}

function BoardRoot({ children }: IBoardRootProps): JSX.Element {
  const [side, setSide] = useState<Orientation>('white');
  const boardRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  const controllerRef = useRef<GameController | null>(null);
  if (!controllerRef.current) {
    controllerRef.current = new GameController();
  }
  const controller: GameController = controllerRef.current;
  const state = useGameController(controller);

  const info: IBoardInfos = useMemo((): IBoardInfos => {
    const base = getBoardInfos(side);
    return {
      ...base,
      selected: state.selected ? state.selected.toString() : null,
      legalTargets: state.legalTargets,
      currentSide: state.currentSide,
      result: state.result,
      isGameOver: state.isGameOver,
      lastIllegal: state.lastIllegal,
      whiteTime: state.whiteTime,
      blackTime: state.blackTime,
      moves: state.moveRecords,
      onSelectCell: (position) => controller.selectSquare(position),
      onDragStart: (position) => controller.startDrag(position),
      onDragEnd: () => controller.endDrag(),
      onDrop: (position) => controller.drop(position),
      onNewGame: () => {
        controller.reset();
        controller.setHumanSide('white');
        setSide('white');
      },
    };
  }, [state, side, controller]);

  const handleRotate: (orientation: Orientation) => void = useCallback(
    (orientation: Orientation): void => {
      if (orientation === side) return;
      controller.reset();
      controller.setHumanSide(orientation);
      setSide(orientation);
    },
    [controller, side]
  );

  return (
    <BoardContext.Provider value={info}>
      <section className="chess-page flex min-h-screen w-full items-center justify-center overflow-x-hidden px-4 py-8 sm:px-6">
        <div className="w-full max-w-[980px]" style={{ perspective: '1000px' }}>
          <div ref={boardRef} className="flex items-end justify-center will-change-transform">
            {children}
          </div>
        </div>
        <BoardOrientation boardRef={boardRef} orientation={side} onRotate={handleRotate} />
      </section>
      {state.isGameOver && (
        <GameOverlay
          result={state.result}
          humanSide={controller.getHumanSide()}
          onNewGame={() => controller.reset()}
        />
      )}
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
