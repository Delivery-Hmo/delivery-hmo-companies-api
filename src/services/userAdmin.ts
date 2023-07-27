import { FilterQuery } from "mongoose";
import { PaginatedListServiceProps } from "../interfaces/services";
import { handleErrorFunction } from "../utils/handleError";
import UserAdminModel from "../models/userAdmin";
import { getPaginatedList } from "../repositories";
import { UserAdmin } from "../interfaces/users";
import { findByIdAndUpdateUserAdmin, findByIdUserAdmin } from "../repositories/userAdmin";

export const getPaginatedListUserAdmins = async ({ search, page, limit }: PaginatedListServiceProps) => {
  try {
    let query: FilterQuery<UserAdmin> = {
      active: true
    };

    if (search) {
      query.$or = [
        { name: { "$regex": search, "$options": "i" } },
        { email: { "$regex": search, "$options": "i" } }
      ];
    }

    return await getPaginatedList({ model: UserAdminModel, query, populate: "", page, limit });
  } catch (error) {
    throw handleErrorFunction(error);
  }
}

export const validateImagesUserAdmin = async ({ id, images }: { id: string, images: string[] }) => {
  try {
    const userAdmin = await findByIdUserAdmin(id) as UserAdmin;

    userAdmin.images = images;
    userAdmin.validatingImages = true;

    return await findByIdAndUpdateUserAdmin(id, userAdmin);
  } catch (error) {
    throw handleErrorFunction(error);
  }
}