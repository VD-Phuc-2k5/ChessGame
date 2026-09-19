import { useCallback, useSyncExternalStore } from 'react';

import { GameController, GameSnapshot } from './gameController';

function useGameController(controller: GameController): GameSnapshot {
  const subscribe: (listener: () => void) => () => void = useCallback(
    (listener: () => void): (() => void) => controller.subscribe(listener),
    [controller]
  );
  const getSnapshot: () => GameSnapshot = useCallback(
    (): GameSnapshot => controller.getSnapshot(),
    [controller]
  );
  const getServerSnapshot: () => GameSnapshot = useCallback(
    (): GameSnapshot => controller.getSnapshot(),
    [controller]
  );

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export { useGameController };
