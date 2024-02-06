import { BrowserWindow } from 'electron';
import { RegisterType } from '../../shared/utils/TypeRegistry';
import { IClock } from './IClock';
import emitToClient from '../IPC/EmitToClient';
import { ClockStatus } from '../../shared/Types/ClockStatus';

@RegisterType('AR73')
export default class AR73 implements IClock {
  private browserWindow: BrowserWindow;

  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
  }

  onDataReceived(data: Buffer): void {
    const dataStr = data.toString().substring(25).split(',');
    this.parseData(dataStr);
  }

  parseData(data: string[]): void {
    const clockStatus: ClockStatus = {
      Time: data[2],
      Date: data[3],
      GPS: data[0],
      Lat: data[6],
      Lng: data[7],
      NumOfSat: data[9],
    };
    emitToClient(this.browserWindow, 'clock_status', clockStatus);
  }
}
