import { UserAdmin, UserDeliveryMan } from "../interfaces/users";
import { handleErrorFunction } from "../utils/handleError";

export const newUserDeliveryMan = (userDeliveryMan: UserDeliveryMan) => {
  try {
    const user = global?.user;
    userDeliveryMan.userAdmin = user as UserAdmin;

    if (userDeliveryMan.branchOffice === '') {
      userDeliveryMan.branchOffice = undefined
    }

    userDeliveryMan;
    return userDeliveryMan;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}