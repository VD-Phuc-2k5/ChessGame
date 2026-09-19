'use client';

import { useBoard } from '@/context/BoardContext';
import { JSX } from 'react/jsx-dev-runtime';

const MOVE_TIMES: Array<{ label: string; ms: number }> = [
  { label: 'Nhanh', ms: 250 },
  { label: 'Vừa', ms: 500 },
  { label: 'Mạnh', ms: 1000 },
];

function GameControls(): JSX.Element {
  const { playerMode, engineThinking, engineMoveTime, onSetPlayerMode, onSetEngineMoveTime } =
    useBoard();

  return (
    <div className="flex w-64 flex-col gap-3 rounded-lg border border-gray-700 bg-gray-900 p-3 text-gray-200">
      <div className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Chế độ chơi</div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSetPlayerMode('human')}
          className={`flex-1 rounded-lg px-3 py-1.5 text-sm transition-colors ${
            playerMode === 'human'
              ? 'bg-emerald-500 font-semibold text-white ring-2 ring-emerald-200/80'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          2 người
        </button>
        <button
          type="button"
          onClick={() => onSetPlayerMode('engine')}
          className={`flex-1 rounded-lg px-3 py-1.5 text-sm transition-colors ${
            playerMode === 'engine'
              ? 'bg-emerald-500 font-semibold text-white ring-2 ring-emerald-200/80'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Chơi với máy
        </button>
      </div>
      {playerMode === 'engine' && (
        <>
          <div className="flex gap-2">
            {MOVE_TIMES.map((option) => (
              <button
                key={option.ms}
                type="button"
                onClick={() => onSetEngineMoveTime(option.ms)}
                aria-pressed={engineMoveTime === option.ms}
                style={
                  engineMoveTime === option.ms
                    ? { backgroundColor: '#10b981', color: '#ffffff' }
                    : undefined
                }
                className={`flex-1 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                  engineMoveTime === option.ms
                    ? 'bg-emerald-500 font-semibold text-white ring-2 ring-emerald-200/80'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex h-5 items-center text-xs text-gray-400">
            {engineThinking ? 'Máy đang suy nghĩ...' : ''}
          </div>
        </>
      )}
    </div>
  );
}

export default GameControls;
