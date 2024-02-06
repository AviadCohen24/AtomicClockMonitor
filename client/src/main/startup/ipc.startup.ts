import { BrowserWindow } from 'electron';
import * as ClientEventHandlers from './clientEventHandlers';
import registerEvent from '../IPC/RegisterEvent';
import { ErrorMessage } from '../../shared/Types/ErrorMessage';
import createStackTraceFromException from '../../shared/utils/StackTrace.utils';

// Wrap each event handler in a try catch statement that automatically sends an ErrorMessage
// event to the client upon error
export default function setIpcRoutes(
  // eslint-disable-next-line no-undef
  ipcMain: Electron.IpcMain,
  browserWindow: BrowserWindow
) {
  async function forwardErrorsToClient<T>(
    action: () => Promise<T>
  ): Promise<T | null> {
    try {
      return action();
    } catch (ex: any) {
      // eslint-disable-next-line camelcase
      const err_msg: ErrorMessage = {
        stringMessage: `Error from server: ${createStackTraceFromException(
          ex
        )}`,
      };
      try {
        ClientEventHandlers.handleErrorMessage(browserWindow, err_msg);
      } catch (exc: any) {
        console.log(
          // eslint-disable-next-line prettier/prettier
          `Exception while handling exception. ${createStackTraceFromException(exc)}`
        );
      }
      return null;
    }
  }

  registerEvent('start_monitor', ipcMain, async () => {
    await forwardErrorsToClient(async () =>
      ClientEventHandlers.handleClientRequestStarting(browserWindow)
    );
    return null;
  });
}
