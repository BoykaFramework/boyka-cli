export class BoykaError extends Error {
  constructor(message: string, cause?: ErrorOptions) {
    super(message, {
      cause,
    });
    Error.captureStackTrace(this, this.constructor);
  }
}
