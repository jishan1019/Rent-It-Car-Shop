import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  token?: string;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const response = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    token: data.token,
  };

  if (!data.token) {
    delete response.token;
  }

  res.status(data.statusCode).json({
    response,
  });
};

export default sendResponse;
