import { BranchOffice } from "../interfaces";
import { Rols } from "../types";
import { newBranchOffice } from "./branchOffice";
import { createUserAuth } from "../repositories/firebaseAuth";

export const createUser = async <T extends {}>(model: T, displayName: Rols) => {
  const promise = new Promise<T>((res) => res);
  const newModels: Record<Rols, Promise<T>> = {
    "Administrador sucursal": newBranchOffice(model as any as BranchOffice) as any as Promise<T>,
    "Administrador": promise,
    "Repartidor": promise,
    "Vendedor": promise,
    "": promise
  } as const;
  const m = newModels[displayName] as any & { email: string, password?: string, uid: string };
  const { email, password } = m;

  const userAuth = await createUserAuth({ email, password, displayName });

  m.uid = userAuth.uid;
  delete m.password;

  return m;
}

