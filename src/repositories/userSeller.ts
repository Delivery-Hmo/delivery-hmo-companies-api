import { FilterQuery } from "mongoose";
import { UserSeller } from "../interfaces/users";
import UserSellerModel from "../models/userSeller";
import { UndefinedInterface } from "../types";

export const createUserSeller = (model: UserSeller) => UserSellerModel.create(model);

export const findOneUserSeller = (query: FilterQuery<UserSeller>) => UserSellerModel.findOne(query);

export const findByIdAndUpdateUserSeller = (id: string, data: UndefinedInterface<UserSeller>) => UserSellerModel.findByIdAndUpdate(id, data, { new: true });

export const findByIdUserSeller = (id: string) => UserSellerModel.findById(id);

export const findByUidUserSeller = (uid: string) => UserSellerModel.findOne({ uid });

export const findUserSeller = (query: FilterQuery<UserSeller>) => UserSellerModel.find(query);
