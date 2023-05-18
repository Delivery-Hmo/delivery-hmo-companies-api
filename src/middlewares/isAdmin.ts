import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isAdmin = async (_: Request, res: Response, next: NextFunction) => {
  try {
    if(global.user?.role !== "Administrador") {
      return unauthorized(res);
    }
    
    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
}

export default isAdmin;