import { Request, Response, NextFunction } from "express";
import { unauthorized } from "../utils/handleError";

const isBranchOffice = async (_: Request, res: Response, next: NextFunction) => {
  try {
    if(!global.user?.role || !["Administrador", "Administrador sucursal"].includes(global.user.role)) {
      return unauthorized(res);
    }
    
    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
}

export default isBranchOffice;