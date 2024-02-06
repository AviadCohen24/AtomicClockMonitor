export interface IClock {
  parseData(data: string[]): void;
  onDataReceived(data: Buffer): void;
}
