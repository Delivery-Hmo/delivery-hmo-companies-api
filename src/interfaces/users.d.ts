import { Rols } from "../types";
import { CommentsBranchOffice } from "./commentsBranchOffice";

export interface User {
  readonly id?: string;
  uid?: string;
  readonly role: Rols;
  name: string;
  email: string;
  description?: string;
  active: boolean;
  readonly image: string;
  password?: string;
}
export interface UserAdmin extends User {
  phone?: number; 
  rfc?: string;
}

export interface BranchOffice extends User {
  userAdmin?: string | UserAdmin;
  salesGoalByMonth: number;
  facebook: string; 
  phones: number[];
  latLng: LatLng;
  center: LatLng;
  radius: number;
  address: string; 
  showingInApp: boolean;
  comments?: CommentsBranchOffice[];
  totolSales?: number; 
  validatedImages: boolean;
  validatingImages: boolean;
}

export interface UserSeller extends User {
  branchOffice?: string | BranchOffice;
  userAdmin?: string | UserAdmin;
  phone?: number; 
}

export interface UserDeliveryMan extends User {
  branchOffice?: string | BranchOffice;
  userAdmin?: string | UserAdmin;
  latLng?: LatLng;
  phone?: number; 
}
