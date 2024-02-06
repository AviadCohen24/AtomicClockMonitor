import React from 'react';
import { StatusProvider } from '../Context/Status.context';

type AllProvidersProps = {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
};

export default function AllProviders({ children }: AllProvidersProps) {
  return <StatusProvider>{children}</StatusProvider>;
}
