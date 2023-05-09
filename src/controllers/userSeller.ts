import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { UserSeller, UserAdmin } from '../interfaces';
import UserSellerModel from '../models/userSeller';
import { getPaginatedList } from "../services";
import { FilterQuery, Model } from "mongoose";
import { createUserAuth, updateUserAuth } from "../services/firebaseAuth";

export const create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as UserSeller;
    const { email, password } = model;

    const createAuth = await createUserAuth(email, password as string, "Vendedor");

    const userAdmin = global?.user;

    model.uid = createAuth.uid;
    model.userAdmin = userAdmin as UserAdmin;
    model.role = "Vendedor";

    delete model.password;

    const userBranchOfficeSeller = await UserSellerModel.create(model);

    return res.status(201).json(userBranchOfficeSeller);
  } catch (err) {
    return handleError(res, err);
  }
}

export const listByUserAdmin = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const userAdmin = global?.user;
    const { search } = req.query;

    let query: FilterQuery<Model<UserSeller>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    if (search) {
      query.$or = [
        { name: { "$regex": search, "$options": "i" } },
        { email: { "$regex": search, "$options": "i" } },
        { phone: { "$regex": search, "$options": "i" } },
      ];
    }

    const paginatedList = await getPaginatedList({ model: UserSellerModel, query, populate: [], req });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id } = req.query;

    const model = await UserSellerModel.findById(id);

    return res.json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as UserSeller;
    const { email, password, id } = model;

    await updateUserAuth(model.uid, { email, password });

    const userBranchOfficeSeller = await UserSellerModel.findByIdAndUpdate(id, { email, password, id });

    return res.status(200).json(userBranchOfficeSeller);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id, active } = req.body;

    const userBranchOfficeSeller = await UserSellerModel.findByIdAndUpdate(id, { active });

    return res.status(200).json(userBranchOfficeSeller);
  } catch (err) {
    return handleError(res, err);
  }
}