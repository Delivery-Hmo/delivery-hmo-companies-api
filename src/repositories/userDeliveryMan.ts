import { UserDeliveryMan } from "../interfaces/users";
import UserDeliveryManModel from "../models/userDeliveryMan";

export const createUserDeliveryMan = (model: UserDeliveryMan) => UserDeliveryManModel.create(model);
