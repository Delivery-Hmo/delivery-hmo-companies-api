import { UserAdmin, UserSeller } from "../interfaces/users";
import { handleErrorFunction } from "../utils/handleError";
import UserSellerModel from "../models/userSeller";
import { UndefinedInterface } from "../types/index.js";

export const findByIdUserSeller = (id: string) => UserSellerModel.findById(id);

export const findByIdAndUpdateUserSeller = (id: string, data: UserSeller | Record<string, any>) => UserSellerModel.findByIdAndUpdate(id, data);

export const newUserSeller = (userSeller: UserSeller) => {
  try {
    const user = global?.user;
    userSeller.userAdmin = user as UserAdmin;

    if (userSeller.branchOffice === '') {
      userSeller.branchOffice = undefined
    }

    return userSeller;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}

export const validateImagesUserSeller = async ({ id, images }: UndefinedInterface<UserSeller>) => {
  try {
    return await findByIdAndUpdateUserSeller(id!, { images, validatingImages: true });
  } catch (error) {
    throw handleErrorFunction(error);
  }
}