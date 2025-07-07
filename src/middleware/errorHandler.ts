import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Default error
  let error = {
    success: false,
    message: err.message || 'Something went wrong',
    status: err.statusCode || 500
  };

  // Prisma errors
  if (err.code === 'P2002') {
    error.message = 'Duplicate field value entered';
    error.status = 400;
  }

  if (err.code === 'P2025') {
    error.message = 'Record not found';
    error.status = 404;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.status = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.status = 401;
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    error.status = 400;
  }

  res.status(error.status).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
