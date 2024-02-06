import { useCallback, useContext, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import { StatusContext, StatusContextType } from '../Context/Status.context';
import { ClockStatus } from '../../shared/Types/ClockStatus';
import { ErrorMessage } from '../../shared/Types/ErrorMessage';
import { offServerEvent, onServerEvent } from '../IPC/OnServerEvent';

export default function useServerEventHandlers() {
  const clockContext = useContext<StatusContextType>(StatusContext);

  const statusFromClock = useCallback(
    (_event: IpcRendererEvent, statusData: ClockStatus) => {
      clockContext.setStatus(statusData);
    },
    [clockContext]
  );

  const errorMessageHandler = useCallback(
    (_event: IpcRendererEvent, err: ErrorMessage) => {
      console.error(`Error from server: ${err.stringMessage}`);
    },
    []
  );

  useEffect(() => {
    onServerEvent('clock_status', statusFromClock, false);
    onServerEvent('error_message', errorMessageHandler, false);
    return () => {
      // offServerEvent('clock_status', statusFromClock);
      // offServerEvent('error_message', errorMessageHandler);
    };
  }, [statusFromClock, errorMessageHandler]);
}
