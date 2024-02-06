/* eslint-disable prettier/prettier */

import { ClockStatus } from "../../Types/ClockStatus";
import { ErrorMessage } from "../../Types/ErrorMessage";

export interface IPC_PushNotification {
  'clock_status': {
    payload: ClockStatus;
  };
  'error_message': {
    payload: ErrorMessage;
  };
}
