import invokeServer from '../IPC/InvokeServer';

export type UserActionHandlers = {
  handleStartMonitor: () => void;
};

export const useUserActionHandlers = (): UserActionHandlers => {
  const handleStartMonitor = () => {
    invokeServer('start_monitor', null);
  };

  return {
    handleStartMonitor,
  };
};
