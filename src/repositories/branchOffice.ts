import BranchOfficeModel from '../models/brancOffice/index.js';
import { FilterQuery } from 'mongoose';
import { BranchOffice } from "../interfaces/users";
import { UndefinedInterface } from "../types/index.js";

export const findByIdBranchOffice = (id: string) => BranchOfficeModel.findById(id);

export const findByUidBranchOffice = (uid: string) => BranchOfficeModel.findOne({ uid });

export const findBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.find(query);

export const findOneBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.findOne(query);

export const createBranchOffice = (model: BranchOffice) => BranchOfficeModel.create(model);

export const findByIdAndUpdateBranchOffice = (id: string, data: UndefinedInterface<BranchOffice>) => BranchOfficeModel.findByIdAndUpdate(id, data, { new: true });
