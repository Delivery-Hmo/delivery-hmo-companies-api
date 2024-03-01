import userSuperAdmin from "../models/userSuperAdmin";

export const findByUidUserSuperAdmin = (uid: string) => userSuperAdmin.findOne({ uid });
