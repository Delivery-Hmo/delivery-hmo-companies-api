export interface CommentsBranchOffice {
  readonly id?: string;
  comment: string;
  user: string;
  date: Date;
  branchOffice: string | BranchOffice;
}