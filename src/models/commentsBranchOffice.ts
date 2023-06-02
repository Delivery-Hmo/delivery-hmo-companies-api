import { Schema, model, SchemaOptions } from 'mongoose';
import { optionsModel } from '../constants';
import { CommentsBranchOffice} from '../interfaces';

const schema = new Schema<CommentsBranchOffice>(
  {
    comment: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
    branchOffice: { type: Schema.Types.ObjectId, ref: 'BranchOffice', required: true }
  }, 
  optionsModel as SchemaOptions<CommentsBranchOffice>
);

export default model<CommentsBranchOffice>('CommentsBranchOffice', schema);