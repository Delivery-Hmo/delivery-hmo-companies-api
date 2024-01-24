import { Request, Response, NextFunction } from "express";
import admin from 'firebase-admin';
import { Rols, Users } from "../types";
import { unauthorized } from "../utils/handleError";
import { findByUidBranchOffice } from "../repositories/branchOffice";
import { findByUidUserAdmin } from "../repositories/userAdmin";
import { getUserAuthByUid, getUserAuthByUidSuperAdmin, verifyIdToken, verifyIdTokenSuperAdmin } from "../repositories/firebaseAuth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { findByUidUserSuperAdmin } from "../repositories/userSuperAdmin";

const getUserDatas: Record<Rols, (uid: string) => Promise<Users | null>> = {
  "Administrador": (uid: string) => findByUidUserAdmin(uid),
  "Administrador sucursal": (uid: string) => findByUidBranchOffice(uid),
  "Vendedor": (uid: string) => Promise.resolve(null),
  "Repartidor": (uid: string) => Promise.resolve(null),
  "SuperAdmin": (uid: string) => findByUidUserSuperAdmin(uid),
};

const pathsSuperAdmnin: readonly string[] = ["/userAdmin/list"];

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { originalUrl } = req;

  if (!authorization?.startsWith('Bearer '))
    return unauthorized(res);

  const split = authorization.split('Bearer ');

  if (split.length !== 2)
    return unauthorized(res);

  const token = split[1];

  try {
    let decodedToken: admin.auth.DecodedIdToken | null = null;
    let userAuth: UserRecord | null = null;

    if (pathsSuperAdmnin.includes(originalUrl)) {
      decodedToken = await verifyIdTokenSuperAdmin(token);

      const { uid } = decodedToken;

      userAuth = await getUserAuthByUidSuperAdmin(uid);
    } else {
      decodedToken = await verifyIdToken(token);

      const { uid } = decodedToken;

      userAuth = await getUserAuthByUid(uid);
    }

    if (originalUrl !== "/userAdmin/create") {
      const user = await getUserDatas[(userAuth.displayName || "") as Rols](userAuth.uid);

      if (!user) return unauthorized(res);

      global.user = user;
    }

    return next();
  } catch (err) {
    console.error(err);
    return unauthorized(res);
  }
};

export default isAuthenticated;