import ModelCommentsBranchOffice from "../models/commentsBranchOffice";
import { CommentsBranchOffice } from "../interfaces/commentsBranchOffice";

export const createManyCommentsBranchOffice = (commentsBranchOffice: CommentsBranchOffice[]) => ModelCommentsBranchOffice.insertMany(commentsBranchOffice);
