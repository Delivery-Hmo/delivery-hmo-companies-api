import { FilterQuery } from "mongoose";
import { getPaginatedList } from "../repositories/allModels";
import { handleErrorFunction } from "../utils/handleError";
import CommentsBranchOfficeModel from '../models/commentsBranchOffice';
import { CommentsBranchOffice } from "../interfaces/commentsBranchOffice";
import { PaginatedListServiceProps } from "../interfaces/services";

export const getPaginatedListByCommentsBranch = async ({ search: idBranchOffice, page, limit }: PaginatedListServiceProps) => {
  try {
    const query: FilterQuery<CommentsBranchOffice> = {
      branchOffice: idBranchOffice,
    };

    return await getPaginatedList({ model: CommentsBranchOfficeModel, query, populate: "", page, limit });
  } catch (error) {
    throw handleErrorFunction(error);
  }
}