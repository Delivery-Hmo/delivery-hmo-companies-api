import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.originalUrl !== "/empresas/create" && !["SuperAdmin", "Administrador"].includes(global.user!.role)) {
      return unauthorized(res);
    }

    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
};

export default isAdmin;