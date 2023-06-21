import { FilterQuery, Model } from "mongoose";
import BranchOfficeModel from '../models/branchOffice';
import { handleErrorFunction } from "../utils/handleError";
import { findBranchOffice } from "../repositories/branchOffice";
import { getPaginatedList } from "../repositories/allModels";
import { PaginatedListServiceProps } from "../interfaces/services";
import { BranchOffice } from "../interfaces/users";

export const getPaginatedListByUserAdmin = async ({ search, page, limit }: PaginatedListServiceProps) => {
  try {
    const userAdmin = global?.user;
    let query: FilterQuery<Model<BranchOffice>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    if (search) {
      query.$or = [
        { name: { "$regex": search, "$options": "i" } },
        { email: { "$regex": search, "$options": "i" } },
      ];
    }

    return await getPaginatedList({ model: BranchOfficeModel, query, populate: "userAdmin", page, limit });
  } catch (error) {
    throw handleErrorFunction(error);
  }
}

export const getListByUserAdmin = async () => {
  try {
    const userAdmin = global?.user;
    const query: FilterQuery<Model<BranchOffice>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    return await findBranchOffice(query);
  } catch (error) {
    throw handleErrorFunction(error);
  }
}

export const newBranchOffice = (branchOffice: BranchOffice) => {
  try {
    const userAdmin = global?.user;
    branchOffice.userAdmin = userAdmin!;

    return branchOffice;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}