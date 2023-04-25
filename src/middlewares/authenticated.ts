import { Request, Response } from "express";
import admin from 'firebase-admin';
import { getUserAdminByUid } from "../services/userAdmin";

const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

const isAuthenticated = async (req: Request, res: Response, next: Function) => {
  const { authorization } = req.headers

  if (!authorization) 
    return unauthorized(res);

  if (!authorization.startsWith('Bearer'))
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
  }
  catch (err) {
    console.error(err);
    return unauthorized(res);
  }
}

export default isAuthenticated;