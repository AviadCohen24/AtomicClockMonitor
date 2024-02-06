/* eslint-disable no-restricted-syntax */
import { BrowserWindow } from 'electron';
import {
  CreateInstance,
  TypeRegistryMap,
} from '../../shared/utils/TypeRegistry';
import { IClock } from './IClock';

type GetClockProps = {
  verResponse: string;
  browserWindow: BrowserWindow;
};

export default class ClockFactory {
  static GetClock({
    verResponse,
    browserWindow,
  }: GetClockProps): IClock | null {
    console.log(`Counted clock right now is: ${TypeRegistryMap.size}`);
    for (const key of TypeRegistryMap.keys()) {
      if (verResponse.toUpperCase().includes(key)) {
        // Found a matching type in the response, use it to create an instance of the clock
        return CreateInstance(key, browserWindow);
      }
    }

    // No matching type found in the response
    return null;
  }
}
