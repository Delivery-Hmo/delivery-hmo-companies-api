import { Request, Response } from "express";
import handleError from "../utils/handleError";
import { UserAdmin } from '../interfaces';
import UserModel from '../models/userAdmin';
import { getUserAdminByUid } from "../services/userAdmin";
import { updateUserAuth } from "../services/firebaseAuth";

export const create = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as UserAdmin;

    await updateUserAuth(model.uid, { displayName: "Administrador" });

    model.active = true;
    model.role = "Administrador";

    const userAdmin = await UserModel.create(model);

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

export const getById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { id } = req.query;

    const model = await UserModel.findById(id);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const getByUid = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { uid } = req.query;

    const model = await getUserAdminByUid(uid as string);

    return res.status(200).json(model);
  } catch (err) {
    return handleError(res, err);
  }
}

export const verifyEmail = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const { email } = req.query;

    const model = await UserModel.findOne({ email })

    return res.status(200).json(Boolean(model));
  } catch (err) {
    return handleError(res, err);
  }
}

export const update = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const model = req.body as UserAdmin;
    const _id = model.id;

    const userUserAdmin = await UserModel.findByIdAndUpdate(_id, model, { new: true });

    return res.status(200).json(userUserAdmin);

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
