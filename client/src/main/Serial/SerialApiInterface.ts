/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-use-before-define */
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { app } from 'electron';
import {
  AvailableSerialPortsRequest,
  ClosePortRequest,
  OpenPortRequest,
  ReadRequest,
  SerialCommServiceClient,
  WriteRequest,
} from '../../shared/proto/serial_api';

// Function to get the correct path whether in development or production
function getProtoPath() {
  // Check if the app is packaged
  const { isPackaged } = app;

  // Construct the path based on whether the app is packaged
  const protoPath = isPackaged
    ? path.join(
        process.resourcesPath,
        'src',
        'shared',
        'proto',
        'serial_api.proto',
      )
    : path.join(__dirname, '..', 'src', 'shared', 'proto', 'serial_api.proto');

  return protoPath;
}

// Create a client instance
const client = new SerialCommServiceClient(
  '127.0.0.1:50051', // Replace with your server's address
  grpc.credentials.createInsecure(),
);

// Example: Calling the OpenSerialPort procedure
export function openSerialPort(
  port: string,
  baudRate: number,
  callback: (error: any, response: any) => void,
) {
  const request: OpenPortRequest = {
    port,
    baudRate,
  };

  client.openSerialPort(request, (error, response) => {
    if (callback) {
      callback(error, response);
    }
  });
}

// CloseSerialPort example
export function closeSerialPort(port: string) {
  const request: ClosePortRequest = {
    port,
  };

  client.closeSerialPort(request, (error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('ClosePortResponse:', response);
    }
  });
}

// WriteToSerial example
export function writeToSerial(data: string) {
  const request: WriteRequest = {
    data,
  };

  client.writeToSerial(request, (error, response) => {
    if (error) {
      console.error('Error To Write:\n', error);
    } else {
      console.log('WriteResponse:', response);
    }
  });
}

const dataQueue: string[] = [];

// Current Data Handler
let currentReadDataHandler: (data: string | undefined) => void = () => {};

// Function to process the queue
function processRevievedDataQueue() {
  while (dataQueue.length > 0) {
    const data = dataQueue.shift();
    currentReadDataHandler(data);
  }
}

// Register a new data handler
export function registerReadDataHandler(
  handler: (data: string | undefined) => void,
) {
  currentReadDataHandler = handler;
}

// Unregister the current data handler
export function unregisterReadDataHandler() {
  currentReadDataHandler = () => {};
}

// ReadFromSerial example (asynchronous)
export function readFromSerial(port: string) {
  const request: ReadRequest = { port, timeout: 0 };
  const call = client.readFromSerial(request); // Assuming 'client' is your gRPC client

  call.on('data', (response) => {
    // Push received data to the queue
    dataQueue.push(response.data);
    processRevievedDataQueue();
  });

  call.on('error', (error) => {
    console.error('Error in readFromSerial:', error);
  });

  call.on('end', () => {
    console.log('Read stream ended');
  });

  // Return a function to unsubscribe (if needed)
  return () => {
    call.cancel(); // This cancels the gRPC call
  };
}

export function getAvailablePorts(): Promise<string[]> {
  // eslint-disable-next-line prettier/prettier
  const request: AvailableSerialPortsRequest = {};
  return new Promise((resolve, reject) => {
    client.listAvailableSerialPorts(request, (error, response) => {
      if (error) {
        console.error('Error:', error);
        reject(error);
      } else {
        resolve(response.portNames);
      }
    });
  });
}
