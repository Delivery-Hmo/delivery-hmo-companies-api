import { NewModelFunction, CreateRepoFunction, Rols, Users, UpdateRepoFunction } from "../types";
import { newBranchOffice } from "./branchOffice";
import { createUserAuth, deleteUserAuth, getUserAuthByEmail, getUserAuthByUid, updateUserAuth } from "../repositories/firebaseAuth";
import { createBranchOffice, findByIdAndUpdateBranchOffice } from "../repositories/branchOffice";
import { createUserAdmin, findByIdAndUpdateUserAdmin } from "../repositories/userAdmin";
import { handleErrorFunction } from "../utils/handleError";
import { MongooseError } from "mongoose";

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

    const userAuth = rol === "Administrador"
      ? await getUserAuthByEmail(email)
      : await createUserAuth({ email, password, displayName: rol })

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
    const newModels: Record<Rols, NewModelFunction<T>> = {
      "Administrador": null,
      "Administrador sucursal": newBranchOffice as any as NewModelFunction<T>,
      "Repartidor": null,
      "Vendedor": null,
      "": null
    } as const;

    if (newModels[rol]) {
      const newModel = newModels[rol]! as ((model: T) => T);
      model = newModel(model)
    }

    const { id, uid, email, password } = model;
    const userAuth = await getUserAuthByUid(uid!);

    await updateUserAuth(uid!, { email: email && userAuth.email !== email ? email : undefined, password });

    oldEmail = userAuth.email!;

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
    if (error instanceof MongooseError && oldEmail) {
      const { uid, password } = model;
      const messageError = password ? `Solo la contraseña pudo ser actualizada. ${error.message}` : error.message;
      try {
        //si esta actualizacion falla hay que hacer algo en el front para que el email de mongo sea igual al userAuth y no tener desfase se informacion
        await updateUserAuth(uid!, { email: oldEmail });

        throw handleErrorFunction(messageError);
      } catch (error) {
        throw handleErrorFunction(messageError);
      }
    }

    throw handleErrorFunction(error);
  }
}
