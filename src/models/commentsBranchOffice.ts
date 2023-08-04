import { Schema, model } from 'mongoose';
import { optionsModel } from '../constants';
import { CommentsBranchOffice } from "../interfaces/commentsBranchOffice";
import { ModelDefinition } from '../types';

type CommentsBranchOfficeInterface = Omit<CommentsBranchOffice, "id">;

const definition: ModelDefinition<CommentsBranchOfficeInterface> = {
  comment: {
    type: String,
    required: [true, "Comentario obligatorio."]
  },
  user: {
    type: String,
    required: [true, "El usuario es obligatorio."]
  },
  branchOffice: {
    type: Schema.Types.ObjectId,
    ref: 'BranchOffice',
    required: true
  },
  createdAt: {
    type: Date,
  }
}

const schema = new Schema<CommentsBranchOffice>(
  definition,
  optionsModel
);

export default model<CommentsBranchOffice>('CommentsBranchOffice', schema);