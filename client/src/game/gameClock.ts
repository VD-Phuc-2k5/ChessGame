import { ColorType } from '@chess/core';

class GameClock {
  private whiteTime: number = 0;
  private blackTime: number = 0;
  private activeSide: ColorType | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private onTick: (() => void) | null = null;

  public setOnTick(listener: () => void): void {
    this.onTick = listener;
  }

  public start(side: ColorType): void {
    this.activeSide = side;
    if (this.timer === null && typeof window !== 'undefined') {
      this.timer = setInterval(() => this.tick(), 1000);
    }
  }

  public swap(nextSide: ColorType): void {
    this.activeSide = nextSide;
  }

  public getWhiteTime(): number {
    return this.whiteTime;
  }

  public getBlackTime(): number {
    return this.blackTime;
  }

  public reset(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.whiteTime = 0;
    this.blackTime = 0;
    this.activeSide = null;
  }

  protected tick(): void {
    if (this.activeSide === 'white') this.whiteTime += 1;
    else if (this.activeSide === 'black') this.blackTime += 1;
    this.onTick?.();
  }
}

export { GameClock };
