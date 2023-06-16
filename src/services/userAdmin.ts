import { UserAdmin } from "../interfaces";
import { handleErrorFunction } from "../utils/handleError";

export const newUserAdmin = async (userAdmin: UserAdmin) => {
  try {
    const { password } = userAdmin;

    if (password && password?.length < 6) {
      throw "La contraseña debe tener al menos 6 caracteres.";
    }
 /*
    const otherModelSameEmail = await findOneBranchOffice({ email });

    if (otherModelSameEmail && otherModelSameEmail?.id !== branchOffice.id) {
      throw "Ya existe una sucursal con este correo.";
    }

    const otherModelSameName = await findOneBranchOffice({ name });

    if (otherModelSameName && otherModelSameName?.id !== branchOffice.id) {
      throw "Ya existe una sucursal con este nombre.";
    }

    const userAdmin = global?.user;
    branchOffice.userAdmin = userAdmin as UserAdmin;
    branchOffice.active = true;
    branchOffice.role = "Administrador sucursal";

    return branchOffice; */
  } catch (error) {
    throw handleErrorFunction(error);
  }
}