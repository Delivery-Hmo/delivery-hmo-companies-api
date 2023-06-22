import { FilterQuery, Model } from "mongoose";
import { CommentsBranchOffice } from "../interfaces";
import { getPaginatedList } from "../repositories/allModels";
import { handleErrorFunction } from "../utils/handleError";
import CommentsBranchOfficeModel from '../models/commentsBranchOffice';

export const getPaginatedListByCommentsBranch = async ({ idBranchOffice, page, limit }: { idBranchOffice: string; page: number; limit: number; }) => {
  try {
    const query: FilterQuery<Model<CommentsBranchOffice>> = {
      branchOffice: idBranchOffice
    };

    return await getPaginatedList({ model: CommentsBranchOfficeModel, query, populate: "", page, limit });

  } catch (error) {
    throw handleErrorFunction(error);
  }
}