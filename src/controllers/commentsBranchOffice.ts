import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { CommentsBranchOffice } from '../interfaces';
import CommentsBranchOfficeModel from '../models/commentsBranchOffice';
import { getPaginatedListByCommentsBranch } from "../services/commentsBranchOffice";

export const create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as CommentsBranchOffice;

    await CommentsBranchOfficeModel.create(model);

    return res.status(201);
  } catch (err) {
    return handleError(res, err);
  }
}

export const listCommentsBranch = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { idBranchOffice } = req.query;

    const paginatedList = await getPaginatedListByCommentsBranch({ idBranchOffice: idBranchOffice as string, req });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id } = req.query;
    const model = await CommentsBranchOfficeModel.findById(id);

    return res.json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as CommentsBranchOffice;
    const _id = model.id;

    await CommentsBranchOfficeModel.findByIdAndUpdate(_id, model);

    return res.status(200);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id, active } = req.body;

    await CommentsBranchOfficeModel.findByIdAndUpdate(id, { active });

    return res.status(200);
  } catch (err) {
    return handleError(res, err);
  }
}