import { NextFunction, Request, Response } from "express";
import { disconnectDB } from "../configServer/mongodb";

export const disconnectDBMiddleware = (_: Request, res: Response, next: NextFunction) => {
  res.on('finish', async () => {
    await disconnectDB();
  });

  next();
};
