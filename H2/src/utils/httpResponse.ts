import type { Response } from "express";
import type { ApiResponse } from "../types/responses.ts";

export const sendSuccess = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(status).json(response);
};

export const sendError = (
  res: Response,
  status: number,
  message: string,
  error?: string
) => {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  return res.status(status).json(response);
};
