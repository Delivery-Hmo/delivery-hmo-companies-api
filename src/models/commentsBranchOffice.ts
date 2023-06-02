import { Schema, model, SchemaOptions } from 'mongoose';
import { optionsModel } from '../constants';
import { CommentsBranchOffice} from '../interfaces';

const schema = new Schema<CommentsBranchOffice>(
  {
    comment: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
    branch: { type: String, required: true},
  }, 
  optionsModel as SchemaOptions<CommentsBranchOffice>
);

export default model<CommentsBranchOffice>('CommentsBranchOffice', schema);