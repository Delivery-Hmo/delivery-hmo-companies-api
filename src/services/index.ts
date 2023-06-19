import { NewModelFunction, CreateRepoFunction, Rols, Users, UpdateRepoFunction, ModelFindByIdFunction } from "../types";
import { newBranchOffice } from "./branchOffice";
import { createUserAuth, deleteUserAuth, getUserAuthByUid, updateUserAuth } from "../repositories/firebaseAuth";
import { createBranchOffice, findByIdAndUpdateBranchOffice, findByIdBranchOffice } from "../repositories/branchOffice";
import { createUserAdmin, findByIdAndUpdateUserAdmin } from "../repositories/userAdmin";
import { handleErrorFunction } from "../utils/handleError";

export const createUser = async <T extends Users>(model: T, rol: Rols) => {
  try {
    const newModels: Record<Rols, NewModelFunction<T>> = {
      "Administrador sucursal": newBranchOffice as any as NewModelFunction<T>,
      "Administrador": newBranchOffice as any as NewModelFunction<T>,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;

    model = newModels[rol]!(model);

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
    if (model.uid) {
      await deleteUserAuth(model.uid);
    }

    throw handleErrorFunction(error);
  }
}

export const updateUser = async <T extends Users>(model: T, rol: Rols) => {
  let oldEmail: string = "";

  try {
    //utilizar el oldModel para actualizar firebase al email anterior por si falla mongose
    const oldModels: Record<Rols, ModelFindByIdFunction<T>>= {
      "Administrador": null,
      "Administrador sucursal": findByIdBranchOffice as any as ModelFindByIdFunction<T>,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;
    
    const newModels: Record<Rols, NewModelFunction<T>> = {
      "Administrador": null,
      "Administrador sucursal": newBranchOffice as any as NewModelFunction<T>,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;

    model = newModels[rol]!(model);

    const { id, uid, email, password } = model;
    const { email: oldEmail } = await getUserAuthByUid(uid!);

    await updateUserAuth(uid!, { email: email && oldEmail !== email ? email : undefined, password });

    const reposUpdate: Record<Rols, UpdateRepoFunction<T>> = {
      "Administrador": findByIdAndUpdateUserAdmin as any as UpdateRepoFunction<T>,
      "Administrador sucursal": findByIdAndUpdateBranchOffice as any as UpdateRepoFunction<T>,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;

    delete model.password;

    const modelUpdated = await reposUpdate[rol]!(id!, model);

    return modelUpdated;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}
