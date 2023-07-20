import { Request, Response } from "express";
import { FunctionController, ReqQuery } from "../types";
import { handleError } from "../utils/handleError";
import { createUser, updateUser } from "../services";
import { getListByUserAdmin, getPaginatedListByUserAdmin, validateImagesBranchOffice } from "../services/branchOffice";
import { findByIdAndUpdateBranchOffice, findByIdBranchOffice, findByUidBranchOffice } from "../repositories/branchOffice";
import { BranchOffice } from "../interfaces/users";

export const getByUid = async (req: Request, res: Response): FunctionController => {
  try {
    const { uid } = req.query as ReqQuery;

    const model = await findByUidBranchOffice(uid);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const paginatedListByUserAdmin = async (req: Request, res: Response): FunctionController => {
  try {
    const { search, page, limit } = req.query as ReqQuery;

    const paginatedList = await getPaginatedListByUserAdmin({ search, page: +page, limit: +limit });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const listByUserAdmin = async (_: Request, res: Response): FunctionController => {
  try {
    const paginatedList = await getListByUserAdmin();

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const create = async (req: Request, res: Response): FunctionController => {
  const body = req.body as BranchOffice;

  try {
    const branchOffice = await createUser(body, "Administrador sucursal");

    return res.status(201).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): FunctionController => {
  try {
    const model = req.body as BranchOffice;

    const branchOffice = await updateUser(model, "Administrador sucursal");

    return res.status(200).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): FunctionController => {
  try {
    const id = req.body.id as string;

    const branchOffice = await findByIdBranchOffice(id!) as BranchOffice;

    branchOffice.active = false

    await findByIdAndUpdateBranchOffice(id, { active: false });

    return res.status(200).json(true);
  } catch (err) {
    return handleError(res, err);
  }
}

export const validateImages = async (req: Request, res: Response): FunctionController => {
  try {
    const { images, id } = req.body as any;

    if(images?.length !== 3) {
      return res.status(500).json("Las fotos de la sucursal deben ser 3.");
    } 

    const branchOffice = await validateImagesBranchOffice({ id: id!, images});

    return res.status(200).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}