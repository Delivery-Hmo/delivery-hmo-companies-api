import { BranchOffice, UserAdmin, UserSeller } from "../interfaces/users";
import { handleErrorFunction } from "../utils/handleError";

export const newUserSeller = (userSeller: UserSeller) => {
  try {
    const user = global?.user;
    userSeller.userAdmin = user as UserAdmin;

    if (user?.role === "Vendedor") {
      return userSeller;
    }

    userSeller.branchOffice = user as BranchOffice;
    return userSeller;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}