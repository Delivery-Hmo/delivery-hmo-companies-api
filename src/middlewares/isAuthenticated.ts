import { Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import admin from 'firebase-admin';
import { Rols, Users } from "../types";
import { unauthorized } from "../utils/handleError";
import { findByUidBranchOffice } from "../repositories/branchOffice";
import { findByUidUserAdmin } from "../repositories/userAdmin";
import { getUserAuthByUid, verifyIdToken } from "../repositories/firebaseAuth";

const getUserDatas: Record<Rols, (uid: string) => Promise<Document | null>> = {
  "Administrador": (uid: string) => findByUidUserAdmin(uid),
  "Administrador sucursal": (uid: string) => findByUidBranchOffice(uid),
  "Vendedor": (uid: string) => Promise.resolve(null),
  "Repartidor": (uid: string) => Promise.resolve(null),
  "SuperAdmin": (uid: string) => Promise.resolve(null),
};

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  const { originalUrl } = req;

  if (!authorization?.startsWith('Bearer '))
    return unauthorized(res);

  const split = authorization.split('Bearer ');

  if (split.length !== 2)
    return unauthorized(res);

  const token = split[1];

  try {
    const decodedToken: admin.auth.DecodedIdToken = await verifyIdToken(token);
    const { uid } = decodedToken;

    const userAuth = await getUserAuthByUid(uid);

    if (originalUrl !== "/userAdmin/create") {
      const user = await getUserDatas[(userAuth.displayName || "") as Rols](uid) as any as Users;

      if (!user) return unauthorized(res);

      global.user = user;
    }

    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
}

export default isAuthenticated;