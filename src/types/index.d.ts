import { Response } from "express";
import { Types, Document, Model } from "mongoose";
import { BranchOffice, SuperAdmin, UserAdmin, UserDeliveryMan, UserSeller } from '../interfaces/users';
import { SchemaDefinitionProperty } from "mongoose";

export { };

declare global {
  var user: Users | undefined;
};

export type Rols = "SuperAdmin" | "Administrador" | "Administrador sucursal" | "Vendedor" | "Repartidor";

export type NameModels = "SuperAdmin" | "UserAdmin" | "BranchOffice" | "UserSeller" | "UserDeliveryMan" | "CommentsBranchOffice";

export type NameModelsUsers = "SuperAdmin" | "UserAdmin" | "BranchOffice" | "UserSeller" | "UserDeliveryMan";
//falta super admin
export type Users = UserAdmin | BranchOffice | UserSeller | UserDeliveryMan;

export type GenericDocument<T> = (Document<T, {}, T> & Omit<T & {
  _id: Types.ObjectId;
}, never>);

export type GenericModel<T> = Model<T, {}, {}, {}, Document<T, {}, T> & Omit<T & {
  _id: Types.ObjectId;
}, never>, any>;

export type NewModelFunction<T> = ((model: T) => T) | null;

export type CreateRepoFunction<T> = ((model: T) => Promise<GenericDocument<T>>) | null;

export type UpdateRepoFunction<T> = ((id: string, model: T) => Promise<GenericDocument<T>>) | null;

export type FunctionController = Promise<Response<any, Record<string, any>>>;

export type ReqQuery = Record<string, string>;

export type UndefinedInterface<T> = {
  [K in keyof T]?: T[K] | undefined;
};

export type ModelDefinition<T> = {
  [K in keyof T]-?: SchemaDefinitionProperty<T[K]>;
};