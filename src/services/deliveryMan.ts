import { UserDeliveryMan } from "../interfaces/users";
import UserDeliveryManModel from '../models/userDeliveryMan';
import { FilterQuery } from 'mongoose';

export const findUserDeliveryMan = (query: FilterQuery<UserDeliveryMan>) => UserDeliveryManModel.find(query);

export const findByIdUserDeliveryMan = (id: string) => UserDeliveryManModel.findById(id);

export const createUserDeliveryMan = (model: UserDeliveryMan) => UserDeliveryManModel.create(model);

export const findByIdAndUpdateUserDeliveryMan = (id: string, data: UserDeliveryMan | Record<string, any>) => UserDeliveryManModel.findByIdAndUpdate(id, data);

export const validateUserDeliveryMan = async (userDeliveryMan: UserDeliveryMan) => {
  const { email } = userDeliveryMan;

  const otherModelSameEmail = await UserDeliveryManModel.findOne({ email });

  if(otherModelSameEmail && otherModelSameEmail?.id !== userDeliveryMan.id) {
    return "Ya existe un repartidor con este correo.";
  }

  return "";
}
