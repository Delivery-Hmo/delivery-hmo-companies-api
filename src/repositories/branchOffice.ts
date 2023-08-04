import BranchOfficeModel from '../models/brancOffice/index.js';
import { FilterQuery } from 'mongoose';
import { handleErrorSaveBranchOffice } from "../utils/handleError";
import { BranchOffice } from "../interfaces/users";
import { UndefinedInterface } from "../types/index.js";

export const findByIdBranchOffice = (id: string) => BranchOfficeModel.findById(id);

export const findByUidBranchOffice = (uid: string) => BranchOfficeModel.findOne({ uid });

export const findBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.find(query);

export const findOneBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.findOne(query);

export const createBranchOffice = async (model: BranchOffice) => {
  try {
    return await BranchOfficeModel.create(model);
  } catch (error) {
    throw handleErrorSaveBranchOffice(error);
  }
}

export const findByIdAndUpdateBranchOffice = async (id: string, data: UndefinedInterface<BranchOffice>) => {
  try {
    return await BranchOfficeModel.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw handleErrorSaveBranchOffice(error);
  }
}