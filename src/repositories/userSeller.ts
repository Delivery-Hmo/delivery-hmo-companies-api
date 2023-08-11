import { FilterQuery } from "mongoose";
import { UserSeller } from "../interfaces/users";
import UserSellerModel from "../models/userSeller";

export const createUserSeller = (model: UserSeller) => UserSellerModel.create(model);
export const findOneUserSeller = (query: FilterQuery<UserSeller>) => UserSellerModel.findOne(query);
