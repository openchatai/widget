export class OpenCXError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenCXError";
  }
}

export class ConnectionError extends OpenCXError {
  constructor(message = "Connection failed") {
    super(message);
    this.name = "ConnectionError";
  }
}

export class AuthenticationError extends OpenCXError {
  constructor(message = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class SessionError extends OpenCXError {
  constructor(message = "Session error occurred") {
    super(message);
    this.name = "SessionError";
  }
}

export class SessionNotDefinedError extends SessionError {
  constructor(message = "Session not defined") {
    super(message);
    this.name = "SessionNotDefinedError";
  }
}

export class TransportError extends OpenCXError {
  constructor(message = "Transport error occurred") {
    super(message);
    this.name = "TransportError";
  }
}

export class FileUploadError extends OpenCXError {
  constructor(message = "File upload failed") {
    super(message);
    this.name = "FileUploadError";
  }
}

export class StorageNotAvailableError extends OpenCXError {
  constructor(message = "Storage is not available") {
    super(message);
    this.name = "StorageNotAvailableError";
  }
}

export class ExternalIdNotDefinedError extends OpenCXError {
  constructor(message = "External ID is not defined") {
    super(message);
    this.name = "ExternalIdNotDefinedError";
  }
}
