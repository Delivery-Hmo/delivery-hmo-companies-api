import { Request, Response } from "express";
import { BranchOffice, UserAdmin } from '../interfaces';
import handleError from "../utils/handleError";
import { createUserAuth, deleteUserAuth, updateUserAuth } from "../services/firebaseAuth";
import { getListByUserAdmin, getPaginatedListByUserAdmin, validateBranchOffice } from "../services/branchOffice";
import { createBranchOffice, findByIdAndUpdateBranchOffice, findByIdBranchOffice, getBranchOfficeByUid } from "../repositories/branchOffice";

export const getByUid = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { uid } = req.query;

    const model = await getBranchOfficeByUid(uid as string);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const paginatedListByUserAdmin = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { search } = req.query;

    const paginatedList = await getPaginatedListByUserAdmin({ search: search as string, req });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const listByUserAdmin = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const paginatedList = await getListByUserAdmin();

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const model = req.body as BranchOffice;

  try {
    const { email, password } = model;
    const userAdmin = global?.user;
    model.userAdmin = userAdmin as UserAdmin;

    await validateBranchOffice(model);

    const createAuth = await createUserAuth(email, password!, "Administrador sucursal");

    delete model.password;
    model.uid = createAuth.uid;
    model.active = true;
    model.role = "Administrador sucursal";

    const branchOffice = await createBranchOffice(model);

    return res.status(201).json(branchOffice);
  } catch (err) {
    if(model.uid) {
      await deleteUserAuth(model.uid);
    }

    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as BranchOffice;
    const { email, password, id, uid } = model;
    const userAdmin = global?.user;

    model.userAdmin = userAdmin as UserAdmin;

    await validateBranchOffice(model);

    if (model.password) {
      delete model.password;

      await updateUserAuth(uid!, { password });
    }

    const oldBranchOffice = await findByIdBranchOffice(id!);

    if (oldBranchOffice?.email !== email) {
      await updateUserAuth(uid!, { email });
    }

    const branchOffice = await findByIdAndUpdateBranchOffice(id!, model);

    return res.status(200).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const id = req.body.id as string;

    await findByIdAndUpdateBranchOffice(id, { active: false });

    return res.status(200).json(true);
  } catch (err) {
    return handleError(res, err);
  }
}