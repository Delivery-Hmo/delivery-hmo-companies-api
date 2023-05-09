import { Request, Response, NextFunction } from "express";
import admin from 'firebase-admin';
import { getUserAdminByUid } from "../services/userAdmin";
import { unauthorized } from "../utils/functions";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer')) 
    return unauthorized(res);

  const split = authorization.split('Bearer ');

  if (split.length !== 2)
    return unauthorized(res);

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
    const { uid } = decodedToken;
    const userAdmin = await getUserAdminByUid(uid);

    if(!userAdmin) return unauthorized(res);

    global.userAdmin = userAdmin;
    
    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
}

export default isAuthenticated;