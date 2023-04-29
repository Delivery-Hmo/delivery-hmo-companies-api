import { UserAdmin } from '../interfaces';

export {};

declare global {
  var userAdmin: UserAdmin | undefined;
}

export type Rols = "" | "Administrador" | "Vendedor" | "Repartidor";