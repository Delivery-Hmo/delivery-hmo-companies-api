import { FilterQuery } from "mongoose";
import { getPaginatedList } from "../repositories";
import { handleErrorFunction } from "../utils/handleError";
import { CommentsBranchOffice } from "../interfaces/commentsBranchOffice";
import { PaginatedListServiceProps } from "../interfaces/services";
import CommentsBranchOfficeModel from "../models/commentsBranchOffice";

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