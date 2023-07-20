import { handleErrorFunction } from "../utils/handleError"
import { default as ModelCommentsBranchOffice } from "../models/commentsBranchOffice"
import { CommentsBranchOffice } from "../interfaces/commentsBranchOffice"

export const createManyCommentsBranchOffice = async (commentsBranchOffice: CommentsBranchOffice[]) => { 
  try {
    return await ModelCommentsBranchOffice.insertMany(commentsBranchOffice)
  } catch (error) {
    throw handleErrorFunction(error)
  }
} 