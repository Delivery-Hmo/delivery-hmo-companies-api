import { Rols } from "../types";

export interface User {
  readonly id?: string;
  uid?: string;
  role: Rols;
  name: string;
  email: string;
  description?: string;
  active: boolean;
  image?: string;
  password?: string;
}
export interface UserAdmin extends User {
  company?: string;
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
  showingInApp?: boolean;
  comments?: CommentsBranchOffice[];
  totolSales?: number; 
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

export interface CommentsBranchOffice {
  readonly id?: string;
  comment: string;
  user: string;
  date: Date;
  branchOffice: string | BranchOffice;
}

export interface LatLng {
  lat: number;
  lng: number;
}
