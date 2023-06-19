import { BranchOffice } from "../interfaces";
import BranchOfficeModel from '../models/branchOffice';
import { FilterQuery } from 'mongoose';
import { handleErrorSaveBranchOffice } from "../utils/handleError";

export const getBranchOfficeByUid = (uid: string) => BranchOfficeModel.findOne({ uid });

export const findBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.find(query);

export const findOneBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.findOne(query);

export const findByIdBranchOffice = (id: string) => BranchOfficeModel.findById(id);

export const createBranchOffice = async (model: BranchOffice) => {
  try {
    return await BranchOfficeModel.create(model);
  } catch (error) {
    throw handleErrorSaveBranchOffice(error);
  }
}

export const findByIdAndUpdateBranchOffice = (id: string, data: BranchOffice | Record<string, any>) => BranchOfficeModel.findByIdAndUpdate(id, data, { new: true });
