import { FilterQuery } from "mongoose";
import { UserDeliveryMan } from "../interfaces/users";
import UserDeliveryManModel from "../models/userDeliveryMan";
import { UndefinedInterface } from "../types";

export const createUserDeliveryMan = (model: UserDeliveryMan) => UserDeliveryManModel.create(model);

export const findOneUserDeliveryMan = (query: FilterQuery<UserDeliveryMan>) => UserDeliveryManModel.findOne(query);

export const findByIdAndUpdateUserDeliveryMan = (id: string, data: UndefinedInterface<UserDeliveryMan>) => UserDeliveryManModel.findByIdAndUpdate(id, data, { new: true });
