import { Model } from "mongoose";
import UserAdminModel from "./userAdmin";
import UserSuperAdminModel from "./userSuperAdmin";
import UserSellerModel from "./userSeller";
import UserDeliveryManModel from "./userDeliveryMan";
import BranchOfficeModel from "./brancOffice";
import { NameUserModels } from "../types";
import { BranchOffice } from "../interfaces/users";

const AllModels: Record<NameUserModels, Model<any>> = {
  "SuperAdmin": UserSuperAdminModel,
  "UserAdmin": UserAdminModel,
  "BranchOffice": BranchOfficeModel as Model<BranchOffice>,
  "UserSeller": UserSellerModel,
  "UserDeliveryMan": UserDeliveryManModel,
} as const;

export default AllModels;