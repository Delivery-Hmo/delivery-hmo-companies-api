import BranchOfficeModel from '../models/brancOffice.ts';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { handleErrorSaveBranchOffice } from "../utils/handleError";
import { BranchOffice } from "../interfaces/users";

export const findByIdBranchOffice = (id: string) => BranchOfficeModel.findById(id);

export const findByUidBranchOffice = (uid: string) => BranchOfficeModel.findOne({ uid });

export const findBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.find(query);

export const findOneBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.findOne(query);

export const createBranchOffice = async (model: BranchOffice) => {
  try {
  } catch (error) {
    throw handleErrorSaveBranchOffice(error);
  }
}

export const findByIdAndUpdateBranchOffice = async (id: string, data: UpdateQuery<BranchOffice>) => {
  try {
    return await BranchOfficeModel.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw handleErrorSaveBranchOffice(error);
  }
}