import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.originalUrl !== "/userAdmin/create" && global.user?.role !== "Administrador") {
      return unauthorized(res);
    }

    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
}

export default isAdmin;