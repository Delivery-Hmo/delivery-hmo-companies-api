import { NewModelFunction, CreateRepoFunction, Rols } from "../types";
import { newBranchOffice } from "./branchOffice";
import { createUserAuth, deleteUserAuth } from "../repositories/firebaseAuth";
import { createBranchOffice } from "../repositories/branchOffice";
import { createUserAdmin } from "../repositories/userAdmin";
import { handleErrorFunction } from "../utils/handleError";

export const createUser = async <T extends { email: string, password?: string, uid?: string }>(model: T, rol: Rols) => {
  try {
    const newModels: Record<Rols, NewModelFunction<T>> = {
      "Administrador sucursal": newBranchOffice as any as NewModelFunction<T>,
      "Administrador": null,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;

    model = await newModels[rol]!(model);

    const { email, password } = model;
  
    const userAuth = await createUserAuth({ email, password, displayName: rol });
  
    model.uid = userAuth.uid;
    delete model.password;

    const reposCreate: Record<Rols, CreateRepoFunction<T>> = {
      "Administrador": createUserAdmin as any as CreateRepoFunction<T>,
      "Administrador sucursal": createBranchOffice as any as CreateRepoFunction<T>,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;
  
    const modelCreated = await reposCreate[rol]!(model);
  
    return modelCreated;
  } catch (error) {
    if(model.uid) {
      await deleteUserAuth(model.uid);
    }

    throw handleErrorFunction(error);
  }
}