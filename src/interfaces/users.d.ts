import { Rols } from "../types";
import { CommentsBranchOffice } from "./commentsBranchOffice";
import { LatLng } from ".";

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
  comments: CommentsBranchOffice[];
  totolSales?: number; 
  showInApp: boolean;
  validatedImages: boolean;
  validatingImages: boolean;
  products: string[] | Product[];
  images: string[];
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
