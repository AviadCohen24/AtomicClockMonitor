/* eslint-disable promise/param-names */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
import { BrowserWindow } from 'electron';
import {
  openSerialPort,
  closeSerialPort,
  writeToSerial,
  readFromSerial,
  getAvailablePorts,
  registerReadDataHandler,
  unregisterReadDataHandler,
} from './SerialApiInterface';
import { IClock } from '../Clocks/IClock';
import ClockFactory from '../Clocks/ClockFactory';

type SerialManagerProps = {
  browserWindow: BrowserWindow;
};

export default class SerialPortManager {
  private clock: IClock | null = null;

  private browserWindow: BrowserWindow;

  private static instance: SerialPortManager;

  private serialPortInfo: { port: string; baudRate: number } | null = null;

  constructor({ browserWindow }: SerialManagerProps) {
    this.browserWindow = browserWindow;
  }

  public static getInstance({
    browserWindow,
  }: SerialManagerProps): SerialPortManager {
    if (!SerialPortManager.instance) {
      SerialPortManager.instance = new SerialPortManager({ browserWindow });
    }
    return SerialPortManager.instance;
  }

  public async detectClock(): Promise<void> {
    const portsResponse = await getAvailablePorts();
    const baudRates = [9600, 19200, 38400, 57600, 74880, 115200];

    for (const port of portsResponse) {
      for (const baudRate of baudRates) {
        try {
          const isOpened = await this.tryOpenPort(port, baudRate);
          if (isOpened) {
            const response = await this.sendVersionCommand(port);
            if (response) {
              this.clock = ClockFactory.GetClock({
                verResponse: response,
                browserWindow: this.browserWindow,
              });

              if (this.clock) {
                console.log(`Clock found on ${port}!`);
                this.serialPortInfo = { port, baudRate };
                registerReadDataHandler(this.onDataReceived.bind(this));
                readFromSerial(port);
                return;
              }
            }
            closeSerialPort(port);
          }
        } catch (error) {
          console.error(
            `Error on port ${port} with baud rate ${baudRate}:`,
            error
          );
        }
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    throw new Error('No clock found!');
  }

  // eslint-disable-next-line class-methods-use-this
  private async tryOpenPort(port: string, baudRate: number): Promise<boolean> {
    return new Promise((resolve) => {
      openSerialPort(port, baudRate, (error, response) => {
        if (error) {
          console.error(`Error opening port: ${port}\n`, error);
          resolve(false);
        } else {
          console.log(`Opened port: ${port}\n`, response);
          resolve(true);
        }
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private async sendVersionCommand(port: string): Promise<string | null> {
    return new Promise((resolve) => {
      writeToSerial('VER');

      // Introduce a delay of 200 milliseconds
      new Promise((resolveDelay) => {
        setTimeout(resolveDelay, 200);
      }).then(() => {
        const receivedDataHandler = (data: string | undefined) => {
          if (typeof data === 'string') {
            unregisterReadDataHandler();
            resolve(data);
          }
        };

        registerReadDataHandler(receivedDataHandler);

        const unsubscribe = readFromSerial(port);

        setTimeout(() => {
          unsubscribe();
          closeSerialPort(port);
          resolve(null);
        }, 1200); // Timeout for the response
      });
    });
  }

  private onDataReceived(data: string | undefined): void {
    if (typeof data === 'string' && this.clock) {
      this.clock.onDataReceived(Buffer.from(data));
    } else {
      console.error('Received data but no clock is instantiated.');
    }
  }
}
