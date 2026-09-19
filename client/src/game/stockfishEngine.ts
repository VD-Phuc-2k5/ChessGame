class StockfishEngine {
  private requestController: AbortController | null = null;

  public stop(): void {
    this.requestController?.abort();
    this.requestController = null;
  }

  public async computeMove(uciMoves: string[], moveTimeMs: number): Promise<string | null> {
    this.stop();
    const controller: AbortController = new AbortController();
    this.requestController = controller;

    try {
      const response: Response = await fetch('/api/engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moves: uciMoves, moveTimeMs }),
        signal: controller.signal,
      });

      if (!response.ok) return null;
      const result: { bestMove: string | null } = (await response.json()) as {
        bestMove: string | null;
      };
      return result.bestMove;
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === 'AbortError') return null;
      throw error;
    } finally {
      if (this.requestController === controller) this.requestController = null;
    }
  }
}

export { StockfishEngine };
