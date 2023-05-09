import { Rols } from "../types";

export interface User {
  id?: string;
  uid: string;
  role: Rols;
  name: string;
  email: string;
  phone?: string; 
  description?: string;
  active: boolean;
  image?: string;
  password?: string;
}
export interface UserAdmin extends User {
  company?: string;
  rfc?: string;
}
export interface UserDeliveryMan extends User {
  branchOffice?: string | BranchOffice;
  userAdmin?: string | UserAdmin;
  latLng: LatLng;
}
export interface UserSeller extends User {
  branchOffice: string | BranchOffice;
  userAdmin: string | UserAdmin;
}
export interface CommentsBranchOffice {
  id?: string;
  comment: string;
  user: string;
  date: Date;
  branchOffice: string | BranchOffice;
}

export interface LatLng {
  lat: number;
  lng: number;
}
export interface BranchOffice {
  id?: string;
  uid?: string;
  userAdmin: string | UserAdmin;
  name: string;
  email: string;
  password?: string;
  salesGoalByMonth: number;
  facebook?: string; 
  phones: [number, number | undefined, number | undefined];
  latLng: LatLng;
  center: LatLng;
  radius: number;
  address: string; 
  active?: boolean;
  showingInApp?: boolean;
  comments?: CommentsBranchOffice[];
  totolSales?: number; 
  role?: Rols;
}