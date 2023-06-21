import { FilterQuery, Model } from "mongoose";
import { CommentsBranchOffice } from "../interfaces";
import { getPaginatedList } from "../repositories/allModels";
import { handleErrorFunction } from "../utils/handleError";
import CommentsBranchOfficeModel from '../models/commentsBranchOffice';
import { Request } from "express";

export const getPaginatedListByCommentsBranch = async ({ idBranchOffice, req }: { idBranchOffice: string, req: Request }) => {
  try {
    const query: FilterQuery<Model<CommentsBranchOffice>> = {
      idBranchOffice
    };

    return await getPaginatedList({ model: CommentsBranchOfficeModel, query, populate: "userAdmin", req });

  } catch (error) {
    throw handleErrorFunction(error);
  }
}