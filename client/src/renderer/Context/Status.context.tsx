/* eslint-disable no-undef */
import { createContext, useState } from 'react';
import { ClockStatus, INITIAL_STATUS } from '../../shared/Types/ClockStatus';

export type StatusContextType = {
  status: ClockStatus;
  setStatus: React.Dispatch<React.SetStateAction<ClockStatus>>;
};

export const StatusContext = createContext<StatusContextType>({
  status: INITIAL_STATUS,
  setStatus: () => {},
});

type StatusProviderProps = {
  children: React.ReactNode;
};

export function StatusProvider({ children }: StatusProviderProps) {
  const [status, setStatus] = useState(INITIAL_STATUS);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
}
