'use client';

import { useBoard } from '@/context/BoardContext';
import { MoveRecord } from '@chess/domain';
import { JSX } from 'react/jsx-dev-runtime';

function buildPairs(
  records: MoveRecord[]
): Array<{ number: number; white?: string; black?: string }> {
  const pairs: Array<{ number: number; white?: string; black?: string }> = [];
  for (let i = 0; i < records.length; i += 2) {
    pairs.push({
      number: Math.floor(i / 2) + 1,
      white: records[i]?.notation,
      black: records[i + 1]?.notation,
    });
  }
  return pairs;
}

function MoveHistoryPanel(): JSX.Element {
  const { moves } = useBoard();
  const pairs = buildPairs(moves);

  return (
    <div className="history-panel flex w-64 flex-col rounded-lg border border-gray-700 bg-gray-900 text-gray-200">
      <div className="border-b border-gray-700 px-4 py-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
        Lịch sử nước đi
      </div>
      <div className="history-scroll min-h-0 flex-1 overflow-y-auto p-2 font-mono text-sm">
        {pairs.length === 0 ? (
          <p className="px-2 py-4 text-center text-gray-500">Chưa có nước đi</p>
        ) : (
          pairs.map((pair) => (
            <div key={pair.number} className="flex gap-2 px-2 py-0.5">
              <span className="w-6 text-right text-gray-500">{pair.number}.</span>
              <span className="w-14">{pair.white ?? ''}</span>
              <span className="w-14">{pair.black ?? ''}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MoveHistoryPanel;
