import { Response } from "express";

export interface ApiResponseShape<T = any> {
  success: boolean;
  data: T;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data: T,
  message: string,
  meta?: { page: number; limit: number; total: number }
): Response => {
  const responseBody: ApiResponseShape<T> = {
    success,
    data,
    message,
  };

  if (meta) {
    responseBody.meta = meta;
  }

  return res.status(statusCode).json(responseBody);
};
