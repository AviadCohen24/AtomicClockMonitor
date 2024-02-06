# AtomicClockMonitor

## Brief
The AtomicClockMonitor is an advanced application designed for precise monitoring and management of atomic clocks. Utilizing Electron for the user interface and Rust for serial port communication, it offers a cross-platform solution that brings high-level accuracy and ease of use to technical and research-oriented environments.

## Description
This application serves as a crucial tool for ensuring exact time synchronization, tailored specifically for aqQuBit atomic clocks. It's engineered to support the complexities of atomic timekeeping while providing a straightforward user interface for monitoring and configuration. Ideal for scientific research, engineering, and anyone with a keen interest in precision timekeeping, the AtomicClockMonitor is your gateway to unparalleled time accuracy.

## Technologies
- **Electron**: Provides a cross-platform GUI that is both efficient and intuitive, making the application accessible on various operating systems without sacrificing quality or functionality.

- **Rust**: Powers the application's serial communication through a gRPC server, offering safe, concurrent handling of data with superior performance, essential for precise timekeeping tasks.

- **gRPC**: Facilitates robust and efficient communication between the application and atomic clocks, ensuring seamless data exchange for accurate time synchronization.

## Supported Atomic Clocks
Currently, the AtomicClockMonitor supports the following models of aqQuBit atomic clocks:
- **AR73 Clock**: This model is the first to be fully compatible with our application, providing users with real-time access to one of the most precise timekeeping devices available.

Future updates will include support for additional aqQuBit atomic clock models as they become available.

