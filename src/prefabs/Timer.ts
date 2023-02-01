export class Timer {
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  public resetTime() {
    this.startTime = Date.now();
  }

  public getTime(): string {
    const elapsedTime = Date.now() - this.startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }
}
