import { Response } from "express";
import { Types, Document, Model } from "mongoose";
import { BranchOffice, UserAdmin, UserDeliveryMan, UserSeller } from '../interfaces/users';

export {};

declare global {
  var user: Users | undefined;
}

export type Rols = "" | "Administrador" | "Administrador sucursal" | "Vendedor" | "Repartidor";

export type NameModels = "UserAdmin" | "BranchOffice" | "UserSeller" | "UserDeliveryMan" | "CommentsBranchOffice";

export type Users = UserAdmin | BranchOffice | UserSeller | UserDeliveryMan;

export type GenericDocument<T> = (Document<unknown, {}, T> & Omit<T & {
  _id: Types.ObjectId;
}, never>)

export type GenericModel<T> = Model<T, {}, {}, {}, Document<unknown, {}, T> & Omit<T & {
  _id: Types.ObjectId;
}, never>, any>;

export type NewModelFunction<T> = ((model: T) => T) | null;

export type CreateRepoFunction<T> = ((model: T) => Promise<GenericDocument<T>>) | null;

export type UpdateRepoFunction<T> = ((id: string, model: T) => Promise<GenericDocument<T>>) | null;

export type FunctionController = FunctionController;

export type ReqQuery = Record<string, string>;

export type UndefinedInterface<T> = {
  [P in keyof T]?: T[P] | undefined;
};
