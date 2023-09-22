import { FilterQuery } from "mongoose";
import { UserSeller } from "../interfaces/users";
import UserSellerModel from "../models/userSeller";
import { UndefinedInterface } from "../types";

export const createUserSeller = (model: UserSeller) => UserSellerModel.create(model);

export const findOneUserSeller = (query: FilterQuery<UserSeller>) => UserSellerModel.findOne(query);

export const findByIdAndUpdateUserSeller = (id: string, data: UndefinedInterface<UserSeller>) => UserSellerModel.findByIdAndUpdate(id, data, { new: true });
