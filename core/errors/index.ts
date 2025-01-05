export class OpenCopilotError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenCopilotError";
  }
}

export class ConnectionError extends OpenCopilotError {
  constructor(message = "Connection failed") {
    super(message);
    this.name = "ConnectionError";
  }
}

export class AuthenticationError extends OpenCopilotError {
  constructor(message = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class SessionError extends OpenCopilotError {
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

export class TransportError extends OpenCopilotError {
  constructor(message = "Transport error occurred") {
    super(message);
    this.name = "TransportError";
  }
}

export class FileUploadError extends OpenCopilotError {
  constructor(message = "File upload failed") {
    super(message);
    this.name = "FileUploadError";
  }
}
