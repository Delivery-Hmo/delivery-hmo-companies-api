import { NewModelFunction, CreateRepoFunction, Rols, Users, UpdateRepoFunction } from "../types";
import { newBranchOffice } from "./branchOffice";
import { createUserAuth, deleteUserAuth, getUserAuthByEmail, getUserAuthByUid, updateUserAuth } from "../repositories/firebaseAuth";
import { createBranchOffice, findByIdAndUpdateBranchOffice, findByIdBranchOffice } from "../repositories/branchOffice";
import { createUserAdmin, findByIdAndUpdateUserAdmin } from "../repositories/userAdmin";
import { handleErrorFunction } from "../utils/handleError";
import { MongooseError } from "mongoose";
import { BranchOffice } from "../interfaces/users";
import { newUserAdmin } from "./userAdmin";
import { newUserDeliveryMan } from "./userDeliveryMan";
import { createUserDeliveryMan, findByIdAndUpdateUserDeliveryMan } from "./deliveryMan";
import { newUserSeller } from "./userSeller";
import { createUserSeller } from "../repositories/userSeller";

export const createUser = async <T extends Users>(model: T, rol: Rols) => {
  try {
    const newModels: Record<Rols, NewModelFunction<T>> = {
      "Administrador sucursal": newBranchOffice as any as NewModelFunction<T>,
      "Administrador": newUserAdmin as any as NewModelFunction<T>,
      "Repartidor": newUserDeliveryMan as any as NewModelFunction<T>,
      "Vendedor": newUserSeller as any as NewModelFunction<T>,
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
      "Repartidor": createUserDeliveryMan as any as CreateRepoFunction<T>,
      "Vendedor": createUserSeller as any as CreateRepoFunction<T>,
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
      "Repartidor": newUserDeliveryMan as any as NewModelFunction<T>,
      "Vendedor": null,
    } as const;

    if (newModels[rol]) {
      const newModel = newModels[rol]!;
      model = newModel(model);
    }

    const { id, uid, email, password } = model;
    const userAuth = await getUserAuthByUid(uid!);

    await updateUserAuth(uid!, { email: email && userAuth.email !== email ? email : undefined, password });

    oldEmail = userAuth.email!;

    const reposUpdate: Record<Rols, UpdateRepoFunction<T>> = {
      "Administrador": findByIdAndUpdateUserAdmin as any as UpdateRepoFunction<T>,
      "Administrador sucursal": findByIdAndUpdateBranchOffice as any as UpdateRepoFunction<T>,
      "Repartidor": findByIdAndUpdateUserDeliveryMan as any as UpdateRepoFunction<T>,
      "Vendedor": null,
    } as const;

    delete model.password;

    if (rol === "Administrador sucursal") {
      const oldBranchOffice = await findByIdBranchOffice(id!);
      const branchOffice = model as BranchOffice;

      const { lat: oldLat, lng: oldLng } = oldBranchOffice?.latLng!;
      const { lat, lng } = branchOffice.latLng!;

      if (lat !== oldLat || lng !== oldLng) {
        branchOffice.showInApp = false;
        branchOffice.validatedImages = false;
        branchOffice.validatingImages = false;
      }

      model = branchOffice as T;
    }

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
