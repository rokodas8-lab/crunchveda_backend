import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/apiResponse";

export interface CustomError extends Error {
  statusCode?: number;
  code?: number; // MongoDB error code
  keyValue?: Record<string, any>;
  errors?: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): Response => {
  console.error("Error handler caught error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong on the server";
  let data: any = null;

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Resource not found with that ID format";
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    message = "Validation Error";
    data = Object.values(err.errors).map((val: any) => val.message);
  }

  // Handle MongoDB duplicate key error (code 11000)
  if (err.code === 11000 && err.keyValue) {
    statusCode = 400;
    const key = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered for ${key}. Please use another value.`;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired. Please refresh your token.";
  }

  return sendResponse(res, statusCode, false, data, message);
};
