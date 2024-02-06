export interface OpenPortRequest {
  port: string;
  baudRate: number;
  // Additional serial port settings can be added here as needed
}

export interface OpenPortResponse {
  successful: boolean;
  message: string;
}

export interface ClosePortRequest {
  port: string;
}

export interface ClosePortResponse {
  successful: boolean;
  message: string;
}

export interface WriteRequest {
  port: string;
  data: Uint8Array; // Assuming the data is sent as bytes
}

export interface WriteResponse {
  successful: boolean;
  message: string;
}

export interface ReadRequest {
  port: string;
  // Additional read parameters can be added here
}

export interface ReadResponse {
  port: string;
  data: Uint8Array; // Assuming the data is received as bytes
}

export interface AvailableSerialPortsRequest {
  // This can be empty if no parameters are needed
}

export interface AvailableSerialPortsResponse {
  ports: string[]; // Assuming the response contains a list of port names
}
