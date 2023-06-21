import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import CommentsBranchOfficeModel from '../models/commentsBranchOffice';
import { CommentsBranchOffice } from "../interfaces/commentsBranchOffice";
import { FunctionController } from "../types";

export const create = async (req: Request, res: Response): FunctionController => {
  try {
    const model = req.body as CommentsBranchOffice;

    await CommentsBranchOfficeModel.create(model);

    return res.status(201);
  } catch (err) {
    return handleError(res, err);
  }
}

export const list = async (req: Request, res: Response): FunctionController => {
  try {
    const { page, limit } = req.query;

    const model = await CommentsBranchOfficeModel.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(page) - 1);
    
    return res.json(model);
  } catch(err) {
    return handleError(res, err);
  }
}

export const getById = async (req: Request, res: Response): FunctionController => {
  try {
    const { id } = req.query;
    const model = await CommentsBranchOfficeModel.findById(id);

    return res.json(model);
  } catch(err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): FunctionController => {
  try {
    const model = req.body as CommentsBranchOffice;
    const _id = model.id;

    await CommentsBranchOfficeModel.findByIdAndUpdate(_id,model);
    
    return res.status(200);
  } catch(err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): FunctionController => {
  try {
    const { id, active } = req.body;
    
    await CommentsBranchOfficeModel.findByIdAndUpdate(id, { active });

    return res.status(200);
  } catch(err) {
    return handleError(res, err);
  }
}