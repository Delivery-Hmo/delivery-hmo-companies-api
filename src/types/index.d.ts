import { Types, Document } from "mongoose";
import { BranchOffice, UserAdmin, UserDeliveryMan, UserSeller } from '../interfaces';

export type Users = UserAdmin | BranchOffice | UserSeller | UserDeliveryMan;

export {};

declare global {
  var user: Users | undefined;
}

export type Rols = "" | "Administrador" | "Administrador sucursal" | "Vendedor" | "Repartidor";

export type GenericDocument<T> = (Document<unknown, {}, T> & Omit<T & {
  _id: Types.ObjectId;
}, never>)
