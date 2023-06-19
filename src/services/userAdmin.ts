import { UserAdmin } from "../interfaces";
import { handleErrorFunction } from "../utils/handleError";

export const newBranchOffice = (userAdmin: UserAdmin) => {
  try {
    userAdmin.active = true;
    userAdmin.role = "Administrador";

    return userAdmin;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}