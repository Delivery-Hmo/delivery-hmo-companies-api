import { UserAdmin } from "../interfaces";
import UserAdminModel from '../models/userAdmin';

export const getUserAdminByUid = (uid: string) => UserAdminModel.findOne({ uid });

export const createUserAdmin = (model: UserAdmin) =>  UserAdminModel.create(model);