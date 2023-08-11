import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import UserSellerModel from '../models/userSeller';
import { FilterQuery } from "mongoose";
import { getPaginatedList } from "../repositories";
import { FunctionController, ReqQuery } from "../types";
import { UserSeller } from "../interfaces/users";
import { createUser, updateUser } from "../services";

export const create = async (req: Request, res: Response): FunctionController => {
  const body = req.body as UserSeller;

  try {
    const userSeller = await createUser(body, "Vendedor");

    return res.status(201).json(userSeller);
  } catch (err) {
    return handleError(res, err);
  }
}

export const listByUserAdmin = async (req: Request, res: Response): FunctionController => {
  try {
    const { page, limit } = req.query as ReqQuery;

    const userAdmin = global?.user;
    const query: FilterQuery<UserSeller> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    const paginatedList = await getPaginatedList({ model: UserSellerModel, query, populate: "branchOffice", page: +page, limit: +limit });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getById = async (req: Request, res: Response): FunctionController => {
  try {
    const { id } = req.query;

    const model = await UserSellerModel.findById(id);

    return res.json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): FunctionController => {
  try {
    const model = req.body as UserSeller;

    const userSeller = await updateUser(model, "Vendedor");

    return res.status(200).json(userSeller);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): FunctionController => {
  try {
    const { id, active } = req.body;

    const userBranchOfficeSeller = await UserSellerModel.findByIdAndUpdate(id, { active });

    return res.status(200).json(userBranchOfficeSeller);
  } catch (err) {
    return handleError(res, err);
  }
}