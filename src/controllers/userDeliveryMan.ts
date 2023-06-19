import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { UserDeliveryMan, UserAdmin } from '../interfaces';
import { FilterQuery, Model } from "mongoose";
import UserDeliverymanModel from '../models/userDeliveryMan';
import { createUserDeliveryMan, findByIdAndUpdateUserDeliveryMan, findByIdUserDeliveryMan, validateUserDeliveryMan } from "../services/deliveryMan";
import { getPaginatedList } from "../repositories/allModels";
import { createUserAuth } from "../repositories/firebaseAuth";
import { ReqQuery } from "../types";

export const listByUserAdmin = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { page, limit } = req.query as ReqQuery;

    const userAdmin = global?.user;
    const query: FilterQuery<Model<UserDeliveryMan>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    const paginatedList = await getPaginatedList({ model: UserDeliverymanModel, query, populate: "branchOffice", page: +page, limit: +limit });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as UserDeliveryMan;
    const { email, password } = model;

    const error = await validateUserDeliveryMan(model);

    if (error) {
      return res.status(500).json(error);
    }

    const userAdmin = global?.user;

    model.userAdmin = userAdmin as UserAdmin;
    model.active = true;
    model.role = "Repartidor";

    delete model.password;

    const createAuth = await createUserAuth({ email, password: password! });

    model.uid = createAuth.uid;

    await createUserDeliveryMan(model);

    return res.status(201).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id } = req.query;

    const model = await findByIdUserDeliveryMan(id as string);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as UserDeliveryMan;
    const { id } = model;

    await findByIdAndUpdateUserDeliveryMan(id as string, model);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id, active } = req.body;

    const model = await findByIdAndUpdateUserDeliveryMan(id, { active });

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}