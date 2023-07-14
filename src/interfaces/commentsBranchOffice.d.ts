import { BranchOffice } from "./users"
export interface CommentsBranchOffice {
  readonly id?: string;
  comment: string;
  user: string;
  createdAt?: Date;
  branchOffice: string | BranchOffice;
}