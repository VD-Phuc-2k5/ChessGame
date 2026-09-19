import { NextResponse } from 'next/server';

import { ChildProcessWithoutNullStreams, spawn } from 'node:child_process';
import path from 'node:path';
import { Interface, createInterface } from 'node:readline';

export const runtime = 'nodejs';

interface EngineRequest {
  moves?: unknown;
  moveTimeMs?: unknown;
}

function isValidMoveList(moves: unknown): moves is string[] {
  return (
    Array.isArray(moves) &&
    moves.every(
      (move: unknown): boolean =>
        typeof move === 'string' && /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(move)
    )
  );
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: EngineRequest;
  try {
    body = (await request.json()) as EngineRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!isValidMoveList(body.moves)) {
    return NextResponse.json({ error: 'Invalid move list' }, { status: 400 });
  }
  const moves: string[] = body.moves;

  const moveTimeMs: number = typeof body.moveTimeMs === 'number' ? body.moveTimeMs : 500;
  const boundedMoveTimeMs: number = Math.min(Math.max(Math.floor(moveTimeMs), 100), 5000);
  const enginePath: string = path.join(
    process.cwd(),
    'public',
    'stockfish-engine',
    'stockfish-linux-x86-64-universal'
  );

  return new Promise<NextResponse>((resolve) => {
    const engine: ChildProcessWithoutNullStreams = spawn(enginePath);
    let settled = false;
    let started = false;
    let readyRequested = false;
    const lines: Interface = createInterface({ input: engine.stdout });
    const timeout = setTimeout(() => finish(null, 504), boundedMoveTimeMs + 3000);

    const finish = (bestMove: string | null, status: number = 200): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      lines.close();
      engine.kill();
      resolve(NextResponse.json({ bestMove }, { status }));
    };

    lines.on('line', (line: string): void => {
      const command: string = line.trim();
      if (!started && !readyRequested && command === 'uciok') {
        readyRequested = true;
        engine.stdin.write('isready\n');
      }
      if (!started && command === 'readyok') {
        started = true;
        engine.stdin.write(
          `${moves.length > 0 ? `position startpos moves ${moves.join(' ')}` : 'position startpos'}\n`
        );
        engine.stdin.write(`go movetime ${boundedMoveTimeMs}\n`);
      }
      if (command.startsWith('bestmove ')) {
        const bestMove: string = command.split(/\s+/)[1];
        finish(bestMove === '(none)' ? null : bestMove);
      }
    });

    engine.on('error', (): void => finish(null, 500));
    engine.stdin.write('uci\n');
  });
}
