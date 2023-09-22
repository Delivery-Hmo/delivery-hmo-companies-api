import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { FilterQuery } from "mongoose";
import UserDeliveryManModel from '../models/userDeliveryMan';
import { findByIdAndUpdateUserDeliveryMan, findByIdUserDeliveryMan } from "../services/deliveryMan";
import { getPaginatedList } from "../repositories";
import { FunctionController, ReqQuery } from "../types";
import { UserDeliveryMan } from "../interfaces/users";
import { createUser, updateUser } from "../services";

export const listByUserAdmin = async (req: Request, res: Response): FunctionController => {
  try {
    const { page, limit } = req.query as ReqQuery;

    const userAdmin = global?.user;
    const query: FilterQuery<UserDeliveryMan> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    const paginatedList = await getPaginatedList({ model: UserDeliveryManModel, query, populate: "branchOffice", page: +page, limit: +limit });

    return res.status(200).json(paginatedList);
  } catch (err) {
    return handleError(res, err);
  }
}

export const create = async (req: Request, res: Response): FunctionController => {
  const body = req.body as UserDeliveryMan;

  try {
    const userDeliveryMan = await createUser(body, "Repartidor");

    return res.status(201).json(userDeliveryMan);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getById = async (req: Request, res: Response): FunctionController => {
  try {
    const { id } = req.query;

    const model = await findByIdUserDeliveryMan(id as string);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): FunctionController => {
  try {
    const model = req.body as UserDeliveryMan;

    const userDeliveryMan = await updateUser(model, "Repartidor");

    return res.status(200).json(userDeliveryMan);
  } catch (err) {
    return handleError(res, err);
  }
}

export const disable = async (req: Request, res: Response): FunctionController => {
  try {
    const id = req.body.id as string;

    const userDeliveryMan = await findByIdUserDeliveryMan(id!);

    userDeliveryMan!.active = false

    await findByIdAndUpdateUserDeliveryMan(id, { active: false });

    return res.status(200).json(true);
  } catch (err) {
    return handleError(res, err);
  }
}