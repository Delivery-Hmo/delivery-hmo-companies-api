import { BranchOffice, UserAdmin, UserDeliveryMan } from "../interfaces/users";
import { handleErrorFunction } from "../utils/handleError";

export const newUserDeliveryMan = (userDeliveryMan: UserDeliveryMan) => {
  try {
    const user = global?.user;
    userDeliveryMan.userAdmin = user as UserAdmin;

    if (user?.role === "Repartidor") {
      return userDeliveryMan;
    }

    userDeliveryMan.branchOffice = user as BranchOffice;
    return userDeliveryMan;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}