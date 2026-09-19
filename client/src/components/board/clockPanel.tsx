'use client';

import { useBoard } from '@/context/BoardContext';
import { JSX } from 'react/jsx-dev-runtime';

function formatTime(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const rest: number = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

function ClockPanel(): JSX.Element {
  const { whiteTime, blackTime } = useBoard();
  const clocks: Array<{ label: string; time: number }> = [
    { label: 'Trắng', time: whiteTime },
    { label: 'Đen', time: blackTime },
  ];

  return (
    <div className="clock-panel flex gap-3">
      {clocks.map((clock) => (
        <div
          key={clock.label}
          className={`flex min-w-0 flex-1 items-center justify-between rounded-lg border px-4 py-2 font-mono text-xl tabular-nums ${
            clock.label === 'Trắng'
              ? 'border-black bg-white text-black'
              : 'border-white/40 bg-black text-white'
          }`}
        >
          <span className="text-xs uppercase">{clock.label}</span>
          <span>{formatTime(clock.time)}</span>
        </div>
      ))}
    </div>
  );
}

export default ClockPanel;
