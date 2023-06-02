import { Request, Response, NextFunction } from "express";
import admin from 'firebase-admin';
import { getUserAdminByUid } from "../services/userAdmin";
import { Rols, Users } from "../types";
import { Document } from "mongoose";
import { getBranchOfficeByUid } from "../services/branchOffice";
import { unauthorized } from "../utils/handleError";

const getUserDatas: Record<Rols, (uid: string) => Promise<Document | null>> = {
  "": () => Promise.resolve(null),
  "Administrador": (uid: string) => getUserAdminByUid(uid),
  "Administrador sucursal": (uid: string) => getBranchOfficeByUid(uid),
  "Vendedor": (uid: string) => Promise.resolve(null),
  "Repartidor": (uid: string) => Promise.resolve(null),
};

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

    const userAuth = await admin.auth().getUser(uid);
    const user = await getUserDatas[(userAuth.displayName || "") as Rols](uid) as any as Users;

    if(!user) return unauthorized(res);

    global.user = user;
    
    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
}

export default isAuthenticated;