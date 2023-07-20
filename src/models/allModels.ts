import UserAdminModel from "./userAdmin";
import BrancOfficeModel from "./brancOffice.ts";
import UserSellerModel from "./userSeller";
import UserDeliveryManModel from "./userDeliveryMan";
import CommentsBranchOfficeModel from "./commentsBranchOffice";
import { GenericModel, NameModels } from "../types";

const AllModels: Record<NameModels, GenericModel<any>> = {
  "UserAdmin": UserAdminModel,
  "BranchOffice": BrancOfficeModel,
  "UserSeller": UserSellerModel,
  "UserDeliveryMan": UserDeliveryManModel,
  "CommentsBranchOffice": CommentsBranchOfficeModel
} as const;

export default AllModels;