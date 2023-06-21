import { Schema, model } from 'mongoose';
import { optionsModel } from '../constants';
import { CommentsBranchOffice } from "../interfaces/commentsBranchOffice";

const schema = new Schema<CommentsBranchOffice>(
  {
    comment: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
    branchOffice: { type: Schema.Types.ObjectId, ref: 'BranchOffice', required: true }
  }, 
  optionsModel
);

export default model<CommentsBranchOffice>('CommentsBranchOffice', schema);