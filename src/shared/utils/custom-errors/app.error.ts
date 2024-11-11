export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
  
    constructor(message: string, statusCode: number, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      // Mantener el nombre de la clase como 'AppError'
      Object.setPrototypeOf(this, new.target.prototype);
      Error.captureStackTrace(this);
    }
}
  