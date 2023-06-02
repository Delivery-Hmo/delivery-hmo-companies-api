import UserModel from '../models/userAdmin';

export const getUserAdminByUid = (uid: string) => UserModel.findOne({uid});