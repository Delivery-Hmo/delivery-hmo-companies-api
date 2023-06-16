import { BranchOffice } from "../interfaces";
import BranchOfficeModel from '../models/branchOffice';
import { FilterQuery } from 'mongoose';

export const getBranchOfficeByUid = (uid: string) => BranchOfficeModel.findOne({ uid });

export const findBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.find(query);

export const findOneBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.findOne(query);

export const findByIdBranchOffice = (id: string) => BranchOfficeModel.findById(id);

export const createBranchOffice = (model: BranchOffice) => BranchOfficeModel.create(model);

export const findByIdAndUpdateBranchOffice = (id: string, data: BranchOffice | Record<string, any>) => BranchOfficeModel.findByIdAndUpdate(id, data, { new: true });
