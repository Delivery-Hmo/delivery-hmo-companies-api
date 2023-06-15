import { NewModelFunction, CreateRepoFunction, Rols, Users, UpdateRepoFunction } from "../types";
import { newBranchOffice } from "./branchOffice";
import { createUserAuth, deleteUserAuth, getUserAuthByUid, updateUserAuth } from "../repositories/firebaseAuth";
import { createBranchOffice, findByIdAndUpdateBranchOffice } from "../repositories/branchOffice";
import { createUserAdmin } from "../repositories/userAdmin";
import { handleErrorFunction } from "../utils/handleError";

export const createUser = async <T extends Users>(model: T, rol: Rols) => {
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
    delete model.email;

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
  try {
    const newModels: Record<Rols, NewModelFunction<T>> = {
      "Administrador sucursal": newBranchOffice as any as NewModelFunction<T>,
      "Administrador": null,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;

    model = await newModels[rol]!(model);

    const { id, uid, email, password } = model;
    const { email: oldEmail } = await getUserAuthByUid(uid!);

    await updateUserAuth(uid!, { email: oldEmail !== email ? email : undefined, password });

    const reposUpdate: Record<Rols, UpdateRepoFunction<T>> = {
      "Administrador": findByIdAndUpdateBranchOffice as any as UpdateRepoFunction<T>,
      "Administrador sucursal": null,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;

    delete model.password;
    delete model.email;

    const modelUpdated = await reposUpdate[rol]!(id!, model);

    return modelUpdated;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}
