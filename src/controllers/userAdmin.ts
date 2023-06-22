import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import UserModel from '../models/userAdmin';
import { findByUidUserAdmin } from "../repositories/userAdmin";
import { createUser, updateUser } from "../services";
import { FunctionController, ReqQuery } from "../types";
import { getPaginatedListUserAdmins } from "../services/userAdmin";
import { UserAdmin } from "../interfaces/users";
import { BodyDisable } from "../interfaces";

export const create = async (req: Request, res: Response): FunctionController => {
  const body = req.body as UserAdmin;

  try {
    const userAdmin = await createUser(body, "Administrador");

    return res.status(201).json(userAdmin);
  } catch (err) {
    return handleError(res, err);
  }
}

export const list = async (req: Request, res: Response): FunctionController => {
  try {
    const { search, page, limit } = req.query as ReqQuery;

    const paginatedList = await getPaginatedListUserAdmins({ search, page: +page, limit: +limit });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getByUid = async (req: Request, res: Response): FunctionController => {
  try {
    const { uid } = req.query as ReqQuery;

    const model = await findByUidUserAdmin(uid);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): FunctionController => {
  try {
    const model = req.body as UserAdmin;

    const branchOffice = await updateUser(model, "Administrador");

    return res.status(200).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): FunctionController => {
  try {
    const { id, active } = req.body as BodyDisable;

    const userAdmin = await UserModel.findByIdAndUpdate(id, { active });

    return res.status(200).json(userAdmin);
  } catch (err) {
    return handleError(res, err);
  }
}
