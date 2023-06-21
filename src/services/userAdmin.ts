import { FilterQuery, Model } from "mongoose";
import { PaginatedListServiceProps } from "../interfaces/services";
import { handleErrorFunction } from "../utils/handleError";
import UserAdminModel from "../models/userAdmin";
import { getPaginatedList } from "../repositories/allModels";
import { UserAdmin } from "../interfaces/users";

export const getPaginatedListUserAdmins = async ({ search, page, limit } : PaginatedListServiceProps) => {
  try {
    let query: FilterQuery<Model<UserAdmin>> = {
      active: true,
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