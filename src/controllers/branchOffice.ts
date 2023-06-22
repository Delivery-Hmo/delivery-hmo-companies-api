import { Request, Response } from "express";
import { BranchOffice } from '../interfaces';
import { ControllerFunction, ReqQuery } from "../types";
import handleError from "../utils/handleError";
import { createUser, updateUser } from "../services";
import { getListByUserAdmin, getPaginatedListByUserAdmin } from "../services/branchOffice";
import { findByIdAndUpdateBranchOffice, getBranchOfficeByUid } from "../repositories/branchOffice";

export const getByUid = async (req: Request, res: Response): ControllerFunction => {
  try {
    const { uid } = req.query;

    const model = await getBranchOfficeByUid(uid as string);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const paginatedListByUserAdmin = async (req: Request, res: Response): ControllerFunction => {
  try {
    const { search, page, limit } = req.query as ReqQuery;

    const paginatedList = await getPaginatedListByUserAdmin({ search, page: +page, limit: +limit });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const listByUserAdmin = async (_: Request, res: Response): ControllerFunction => {
  try {
    const paginatedList = await getListByUserAdmin();

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const create = async (req: Request, res: Response): ControllerFunction => {
  const body = req.body as BranchOffice;

  try {
    const branchOffice = await createUser<BranchOffice>(body, "Administrador sucursal");

    return res.status(201).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): ControllerFunction => {
  try {
    const model = req.body as BranchOffice;

    const branchOffice = await updateUser(model, "Administrador sucursal");

    return res.status(200).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): ControllerFunction => {
  try {
    const id = req.body.id as string;

    await findByIdAndUpdateBranchOffice(id, { active: false });

    return res.status(200).json(true);
  } catch (err) {
    return handleError(res, err);
  }
}