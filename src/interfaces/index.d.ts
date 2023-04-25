import { Roles } from "../types/types";

export interface User {
  id?: string;
  uid: string;
  name: string;
  email: string;
  phone?: string; 
  description?: string;
  imagen?: string;
  active: boolean;
  image?: string;
  role: Roles;
  password?: string;
}
export interface UserAdmin extends User {
  company?: string;
  rfc: string;
}
export interface UserDeliveryMan extends User {
  branchOffice: string | BranchOffice;
  deliveryMan: boolean;
  deliveryManProps? : {
    location: number | null;
  }
  userAdmin: string | UserAdmin;
}
export interface UserBranchOfficeSeller extends User {
  branchOffice: string | BranchOffice;
  userAdmin: string | UserAdmin;
}
export interface CommentsBranchOffice {
  id?: string;
  comment: string;
  user: string;
  date: Date;
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
  comments: CommentsBranchOffice[];
  totolSales?: number; 
}