'use client';

import { JSX } from 'react/jsx-dev-runtime';

interface IGameOverlayProps {
  result: string | null;
  humanSide: string;
  onNewGame: () => void;
}

function GameOverlay({ result, humanSide, onNewGame }: IGameOverlayProps): JSX.Element {
  const winner: string | null = result === '1-0' ? 'white' : result === '0-1' ? 'black' : null;
  const humanWon: boolean = winner !== null && winner === humanSide;
  const title: string = result === '1/2-1/2' ? 'Hòa cờ' : humanWon ? 'Bạn thắng!' : 'Bạn thua';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex w-80 flex-col items-center gap-4 rounded-xl border border-gray-700 bg-gray-900 p-6 text-white shadow-2xl">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="font-mono text-sm text-gray-300">{result}</p>
        <button
          type="button"
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500"
          onClick={onNewGame}
        >
          Chơi lại
        </button>
      </div>
    </div>
  );
}

export default GameOverlay;
