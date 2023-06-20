import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { UserAdmin } from '../interfaces';
import UserModel from '../models/userAdmin';
import { findByUidUserAdmin } from "../repositories/userAdmin";
import { createUser, updateUser } from "../services";
import { ReqQuery } from "../types";

export const create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const body = req.body as UserAdmin;

  try {
    const userAdmin = await createUser(body, "Administrador");

    return res.status(201).json(userAdmin);
  } catch (err) {
    return handleError(res, err);
  }
}

export const list = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { page, limit } = req.query;

    const model = await UserModel.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(page) - 1);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getByUid = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { uid } = req.query as ReqQuery;

    const model = await findByUidUserAdmin(uid);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as UserAdmin;

    const branchOffice = await updateUser(model, "Administrador");

    return res.status(200).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id, active } = req.body;

    const userAdmin = await UserModel.findByIdAndUpdate(id, { active });

    return res.status(200).json(userAdmin);
  } catch (err) {
    return handleError(res, err);
  }
}
