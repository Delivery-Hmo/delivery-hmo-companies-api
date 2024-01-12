import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (global.user?.role !== "SuperAdmin") {
      return unauthorized(res);
    }

    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
};

export default isSuperAdmin;