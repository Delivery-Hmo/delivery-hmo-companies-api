import UserAdminModel from "./userAdmin";
import BrancOfficeModel from "./brancOffice";
import UserSellerModel from "./userSeller";
import UserDeliveryManModel from "./userDeliveryMan";
import CommentsBranchOfficeModel from "./commentsBranchOffice";
import { NameModels, } from "../types";
import userSuperAdmin from "./userSuperAdmin";
import { Model } from "mongoose";

const AllModels = <T extends {}>(): Record<NameModels, Model<T>> => ({
  "UserAdmin": UserAdminModel as any as Model<T>,
  "BranchOffice": BrancOfficeModel as any as Model<T>,
  "UserSeller": UserSellerModel as any as Model<T>,
  "UserDeliveryMan": UserDeliveryManModel as any as Model<T>,
  "CommentsBranchOffice": CommentsBranchOfficeModel as any as Model<T>,
  "SuperAdmin": userSuperAdmin as any as Model<T>
});

export default AllModels;