import { Request, Response } from "express";
import { BranchOffice, UserAdmin } from '../interfaces';
import BranchOfficeModel from '../models/branchOffice';
import handleError from "../utils/handleError";
import { getPaginatedList } from "../services";
import { createUserFirebase, updateUserFirebase } from "../services/firebaseAuth";
import { FilterQuery, Model } from "mongoose";
import { createBranchOffice, findBranchOffice, findByIdAndUpdateBranchOffice, findByIdBranchOffice, validateBranchOffice } from "../services/branchOffice";

export const paginatedListByUserAdmin = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { search } = req.query;
    const userAdmin = global?.userAdmin;
    let query: FilterQuery<Model<BranchOffice>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    if (search) {
      query.$or = [
        { name: { "$regex": search, "$options": "i" } },
        { email: { "$regex": search, "$options": "i" } },
      ];
    }

    const paginatedList = await getPaginatedList({ model: BranchOfficeModel, query, populate: "userAdmin", req });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const listByUserAdmin = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const userAdmin = global?.userAdmin;
    const query: FilterQuery<Model<BranchOffice>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    const paginatedList = await findBranchOffice(query);

    return res.json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const create = async (req: Request, res: Response): Promise<Response<String, Record<string, any>>> => {
  try {
    const model = req.body as BranchOffice;
    const { email, password } = model;

    const error = await validateBranchOffice(model);

    if (error) {
      return res.status(500).json(error);
    }

    const userAdmin = global?.userAdmin;

    model.userAdmin = userAdmin as UserAdmin;

    delete model.password;

    const createAuth = await createUserFirebase(email, password as string);

    model.uid = createAuth.uid;

    const branchOffice = await createBranchOffice(model);

    return res.status(201).json(branchOffice);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as BranchOffice;
    const { email, password } = model;
    const uid = model.uid as string;

    const error = await validateBranchOffice(model);

    if (error) {
      return res.status(500).json(error);
    }

    const userAdmin = global?.userAdmin;

    model.userAdmin = userAdmin as UserAdmin;

    if (model.password) {
      delete model.password;

      await updateUserFirebase(uid, { password });
    }

    const oldBranchOffice = await findByIdBranchOffice(model.id as string);

    if (oldBranchOffice?.email !== email) {
      await updateUserFirebase(uid, { email });
    }

    const branchOffice = await findByIdAndUpdateBranchOffice(model.id as string, model);

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