/* eslint-disable */
import {
  ChannelCredentials,
  Client,
  ClientReadableStream,
  handleServerStreamingCall,
  makeGenericClientConstructor,
  Metadata,
} from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "serialcomm";

/** Request message for opening a serial port. */
export interface OpenPortRequest {
  /** Serial port to open. */
  port: string;
  /** Baud rate for the serial port. */
  baudRate: number;
}

/** Response message for opening a serial port. */
export interface OpenPortResponse {
  /** Indicates if the open operation was successful. */
  success: boolean;
  /** Detailed error message, if any. */
  error: string;
}

/** Request message for closing a serial port. */
export interface ClosePortRequest {
  /** Serial port to close. */
  port: string;
}

/** Response message for closing a serial port. */
export interface ClosePortResponse {
  /** Indicates if the close operation was successful. */
  success: boolean;
  /** Detailed error message, if any. */
  error: string;
}

/** Request message for writing to a serial port. */
export interface WriteRequest {
  /** Data to be sent. */
  data: string;
}

/** Response message for writing to a serial port. */
export interface WriteResponse {
  /** Indicates if the write operation was successful. */
  success: boolean;
  /** Detailed error message, if any. */
  error: string;
}

/** Request message for reading from a serial port. */
export interface ReadRequest {
  /** Serial port to read from. */
  port: string;
  /** Timeout in milliseconds (optional). */
  timeout: number;
}

/** Response message for reading from a serial port. */
export interface ReadResponse {
  /** Data received from the serial port. */
  data: string;
  /** Detailed error message, if any. */
  error: string;
}

/** Request for listing available serial ports (empty as no parameters are needed) */
export interface AvailableSerialPortsRequest {
}

/** Response for listing available serial ports */
export interface AvailableSerialPortsResponse {
  /** List of available serial port names */
  portNames: string[];
}

function createBaseOpenPortRequest(): OpenPortRequest {
  return { port: "", baudRate: 0 };
}

export const OpenPortRequest = {
  encode(message: OpenPortRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port !== "") {
      writer.uint32(10).string(message.port);
    }
    if (message.baudRate !== 0) {
      writer.uint32(16).int32(message.baudRate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenPortRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenPortRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.baudRate = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenPortRequest {
    return {
      port: isSet(object.port) ? globalThis.String(object.port) : "",
      baudRate: isSet(object.baudRate) ? globalThis.Number(object.baudRate) : 0,
    };
  },

  toJSON(message: OpenPortRequest): unknown {
    const obj: any = {};
    if (message.port !== "") {
      obj.port = message.port;
    }
    if (message.baudRate !== 0) {
      obj.baudRate = Math.round(message.baudRate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OpenPortRequest>, I>>(base?: I): OpenPortRequest {
    return OpenPortRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OpenPortRequest>, I>>(object: I): OpenPortRequest {
    const message = createBaseOpenPortRequest();
    message.port = object.port ?? "";
    message.baudRate = object.baudRate ?? 0;
    return message;
  },
};

function createBaseOpenPortResponse(): OpenPortResponse {
  return { success: false, error: "" };
}

export const OpenPortResponse = {
  encode(message: OpenPortResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenPortResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenPortResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OpenPortResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      error: isSet(object.error) ? globalThis.String(object.error) : "",
    };
  },

  toJSON(message: OpenPortResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OpenPortResponse>, I>>(base?: I): OpenPortResponse {
    return OpenPortResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OpenPortResponse>, I>>(object: I): OpenPortResponse {
    const message = createBaseOpenPortResponse();
    message.success = object.success ?? false;
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseClosePortRequest(): ClosePortRequest {
  return { port: "" };
}

export const ClosePortRequest = {
  encode(message: ClosePortRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port !== "") {
      writer.uint32(10).string(message.port);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClosePortRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClosePortRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClosePortRequest {
    return { port: isSet(object.port) ? globalThis.String(object.port) : "" };
  },

  toJSON(message: ClosePortRequest): unknown {
    const obj: any = {};
    if (message.port !== "") {
      obj.port = message.port;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClosePortRequest>, I>>(base?: I): ClosePortRequest {
    return ClosePortRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClosePortRequest>, I>>(object: I): ClosePortRequest {
    const message = createBaseClosePortRequest();
    message.port = object.port ?? "";
    return message;
  },
};

function createBaseClosePortResponse(): ClosePortResponse {
  return { success: false, error: "" };
}

export const ClosePortResponse = {
  encode(message: ClosePortResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClosePortResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClosePortResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClosePortResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      error: isSet(object.error) ? globalThis.String(object.error) : "",
    };
  },

  toJSON(message: ClosePortResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClosePortResponse>, I>>(base?: I): ClosePortResponse {
    return ClosePortResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClosePortResponse>, I>>(object: I): ClosePortResponse {
    const message = createBaseClosePortResponse();
    message.success = object.success ?? false;
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseWriteRequest(): WriteRequest {
  return { data: "" };
}

export const WriteRequest = {
  encode(message: WriteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteRequest {
    return { data: isSet(object.data) ? globalThis.String(object.data) : "" };
  },

  toJSON(message: WriteRequest): unknown {
    const obj: any = {};
    if (message.data !== "") {
      obj.data = message.data;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteRequest>, I>>(base?: I): WriteRequest {
    return WriteRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteRequest>, I>>(object: I): WriteRequest {
    const message = createBaseWriteRequest();
    message.data = object.data ?? "";
    return message;
  },
};

function createBaseWriteResponse(): WriteResponse {
  return { success: false, error: "" };
}

export const WriteResponse = {
  encode(message: WriteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.success === true) {
      writer.uint32(8).bool(message.success);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WriteResponse {
    return {
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      error: isSet(object.error) ? globalThis.String(object.error) : "",
    };
  },

  toJSON(message: WriteResponse): unknown {
    const obj: any = {};
    if (message.success === true) {
      obj.success = message.success;
    }
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteResponse>, I>>(base?: I): WriteResponse {
    return WriteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteResponse>, I>>(object: I): WriteResponse {
    const message = createBaseWriteResponse();
    message.success = object.success ?? false;
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseReadRequest(): ReadRequest {
  return { port: "", timeout: 0 };
}

export const ReadRequest = {
  encode(message: ReadRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.port !== "") {
      writer.uint32(10).string(message.port);
    }
    if (message.timeout !== 0) {
      writer.uint32(16).int32(message.timeout);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.port = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.timeout = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadRequest {
    return {
      port: isSet(object.port) ? globalThis.String(object.port) : "",
      timeout: isSet(object.timeout) ? globalThis.Number(object.timeout) : 0,
    };
  },

  toJSON(message: ReadRequest): unknown {
    const obj: any = {};
    if (message.port !== "") {
      obj.port = message.port;
    }
    if (message.timeout !== 0) {
      obj.timeout = Math.round(message.timeout);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadRequest>, I>>(base?: I): ReadRequest {
    return ReadRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReadRequest>, I>>(object: I): ReadRequest {
    const message = createBaseReadRequest();
    message.port = object.port ?? "";
    message.timeout = object.timeout ?? 0;
    return message;
  },
};

function createBaseReadResponse(): ReadResponse {
  return { data: "", error: "" };
}

export const ReadResponse = {
  encode(message: ReadResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    if (message.error !== "") {
      writer.uint32(18).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReadResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ReadResponse {
    return {
      data: isSet(object.data) ? globalThis.String(object.data) : "",
      error: isSet(object.error) ? globalThis.String(object.error) : "",
    };
  },

  toJSON(message: ReadResponse): unknown {
    const obj: any = {};
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.error !== "") {
      obj.error = message.error;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ReadResponse>, I>>(base?: I): ReadResponse {
    return ReadResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ReadResponse>, I>>(object: I): ReadResponse {
    const message = createBaseReadResponse();
    message.data = object.data ?? "";
    message.error = object.error ?? "";
    return message;
  },
};

function createBaseAvailableSerialPortsRequest(): AvailableSerialPortsRequest {
  return {};
}

export const AvailableSerialPortsRequest = {
  encode(_: AvailableSerialPortsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AvailableSerialPortsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAvailableSerialPortsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): AvailableSerialPortsRequest {
    return {};
  },

  toJSON(_: AvailableSerialPortsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<AvailableSerialPortsRequest>, I>>(base?: I): AvailableSerialPortsRequest {
    return AvailableSerialPortsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AvailableSerialPortsRequest>, I>>(_: I): AvailableSerialPortsRequest {
    const message = createBaseAvailableSerialPortsRequest();
    return message;
  },
};

function createBaseAvailableSerialPortsResponse(): AvailableSerialPortsResponse {
  return { portNames: [] };
}

export const AvailableSerialPortsResponse = {
  encode(message: AvailableSerialPortsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.portNames) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AvailableSerialPortsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAvailableSerialPortsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portNames.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AvailableSerialPortsResponse {
    return {
      portNames: globalThis.Array.isArray(object?.portNames)
        ? object.portNames.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: AvailableSerialPortsResponse): unknown {
    const obj: any = {};
    if (message.portNames?.length) {
      obj.portNames = message.portNames;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AvailableSerialPortsResponse>, I>>(base?: I): AvailableSerialPortsResponse {
    return AvailableSerialPortsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AvailableSerialPortsResponse>, I>>(object: I): AvailableSerialPortsResponse {
    const message = createBaseAvailableSerialPortsResponse();
    message.portNames = object.portNames?.map((e) => e) || [];
    return message;
  },
};

/** The Serial Communication service definition. */
export type SerialCommServiceService = typeof SerialCommServiceService;
export const SerialCommServiceService = {
  /** Opens the specified serial port with provided settings. */
  openSerialPort: {
    path: "/serialcomm.SerialCommService/OpenSerialPort",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: OpenPortRequest) => Buffer.from(OpenPortRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => OpenPortRequest.decode(value),
    responseSerialize: (value: OpenPortResponse) => Buffer.from(OpenPortResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => OpenPortResponse.decode(value),
  },
  /** Closes the specified serial port. */
  closeSerialPort: {
    path: "/serialcomm.SerialCommService/CloseSerialPort",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ClosePortRequest) => Buffer.from(ClosePortRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ClosePortRequest.decode(value),
    responseSerialize: (value: ClosePortResponse) => Buffer.from(ClosePortResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ClosePortResponse.decode(value),
  },
  /** Sends data to the specified serial port synchronously. */
  writeToSerial: {
    path: "/serialcomm.SerialCommService/WriteToSerial",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: WriteRequest) => Buffer.from(WriteRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => WriteRequest.decode(value),
    responseSerialize: (value: WriteResponse) => Buffer.from(WriteResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => WriteResponse.decode(value),
  },
  /** Reads data from the specified serial port asynchronously. */
  readFromSerial: {
    path: "/serialcomm.SerialCommService/ReadFromSerial",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: ReadRequest) => Buffer.from(ReadRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ReadRequest.decode(value),
    responseSerialize: (value: ReadResponse) => Buffer.from(ReadResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ReadResponse.decode(value),
  },
  /** Listing available serial ports */
  listAvailableSerialPorts: {
    path: "/serialcomm.SerialCommService/ListAvailableSerialPorts",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AvailableSerialPortsRequest) =>
      Buffer.from(AvailableSerialPortsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AvailableSerialPortsRequest.decode(value),
    responseSerialize: (value: AvailableSerialPortsResponse) =>
      Buffer.from(AvailableSerialPortsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AvailableSerialPortsResponse.decode(value),
  },
} as const;

export interface SerialCommServiceServer extends UntypedServiceImplementation {
  /** Opens the specified serial port with provided settings. */
  openSerialPort: handleUnaryCall<OpenPortRequest, OpenPortResponse>;
  /** Closes the specified serial port. */
  closeSerialPort: handleUnaryCall<ClosePortRequest, ClosePortResponse>;
  /** Sends data to the specified serial port synchronously. */
  writeToSerial: handleUnaryCall<WriteRequest, WriteResponse>;
  /** Reads data from the specified serial port asynchronously. */
  readFromSerial: handleServerStreamingCall<ReadRequest, ReadResponse>;
  /** Listing available serial ports */
  listAvailableSerialPorts: handleUnaryCall<AvailableSerialPortsRequest, AvailableSerialPortsResponse>;
}

export interface SerialCommServiceClient extends Client {
  /** Opens the specified serial port with provided settings. */
  openSerialPort(
    request: OpenPortRequest,
    callback: (error: ServiceError | null, response: OpenPortResponse) => void,
  ): ClientUnaryCall;
  openSerialPort(
    request: OpenPortRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: OpenPortResponse) => void,
  ): ClientUnaryCall;
  openSerialPort(
    request: OpenPortRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: OpenPortResponse) => void,
  ): ClientUnaryCall;
  /** Closes the specified serial port. */
  closeSerialPort(
    request: ClosePortRequest,
    callback: (error: ServiceError | null, response: ClosePortResponse) => void,
  ): ClientUnaryCall;
  closeSerialPort(
    request: ClosePortRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ClosePortResponse) => void,
  ): ClientUnaryCall;
  closeSerialPort(
    request: ClosePortRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ClosePortResponse) => void,
  ): ClientUnaryCall;
  /** Sends data to the specified serial port synchronously. */
  writeToSerial(
    request: WriteRequest,
    callback: (error: ServiceError | null, response: WriteResponse) => void,
  ): ClientUnaryCall;
  writeToSerial(
    request: WriteRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: WriteResponse) => void,
  ): ClientUnaryCall;
  writeToSerial(
    request: WriteRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: WriteResponse) => void,
  ): ClientUnaryCall;
  /** Reads data from the specified serial port asynchronously. */
  readFromSerial(request: ReadRequest, options?: Partial<CallOptions>): ClientReadableStream<ReadResponse>;
  readFromSerial(
    request: ReadRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<ReadResponse>;
  /** Listing available serial ports */
  listAvailableSerialPorts(
    request: AvailableSerialPortsRequest,
    callback: (error: ServiceError | null, response: AvailableSerialPortsResponse) => void,
  ): ClientUnaryCall;
  listAvailableSerialPorts(
    request: AvailableSerialPortsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AvailableSerialPortsResponse) => void,
  ): ClientUnaryCall;
  listAvailableSerialPorts(
    request: AvailableSerialPortsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AvailableSerialPortsResponse) => void,
  ): ClientUnaryCall;
}

export const SerialCommServiceClient = makeGenericClientConstructor(
  SerialCommServiceService,
  "serialcomm.SerialCommService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): SerialCommServiceClient;
  service: typeof SerialCommServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
