export class AppError extends Error {
  statusCode: number;
  details?: unknown;
  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode || 500;
    this.details = details;
  }
}
