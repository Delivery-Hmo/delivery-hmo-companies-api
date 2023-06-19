import { FilterQuery } from "mongoose";
import { UserAdmin } from "../interfaces";
import UserAdminModel from '../models/userAdmin';

export const findByIdUserAdmin = (id: string) => UserAdminModel.findById(id);

export const findOneUserAdmin = (query: FilterQuery<UserAdmin>) => UserAdminModel.findOne(query);

export const findByUidUserAdmin = (uid: string) => UserAdminModel.findOne({ uid });

export const createUserAdmin = (model: UserAdmin) =>  UserAdminModel.create(model);

export const findByIdAndUpdateUserAdmin = (id: string, data: UserAdmin) => UserAdminModel.findByIdAndUpdate(id, data, { new: true });
