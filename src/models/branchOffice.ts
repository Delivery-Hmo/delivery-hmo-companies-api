import { Schema, model, SchemaOptions } from 'mongoose';
import { latLngSchema } from '.';
import { maxlength, optionsModel } from '../constants';
import { BranchOffice } from '../interfaces';

export const schema = new Schema<BranchOffice>(
  {
    uid: { type: String, required: true, maxlength },
    userAdmin: { type: Schema.Types.ObjectId, ref: 'UserAdmin' },
    name: { type: String, unique: true, required: true, maxlength },
    email: { type: String, required: true, unique: true, maxlength },
    salesGoalByMonth: { type: Number, default: 0, min: 0, max: 50000 },
    facebook: { type: String, maxlength },
    phones: { type: [Number] },
    latLng: latLngSchema,
    center: latLngSchema,
    radius: { type: Number, required: true, max: 3800, min: 1000 },
    address: { type: String, default: "", maxlength },
    active: { type: Boolean, default: true },
    showingInApp: { type: Boolean, default: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'CommentsBranchOffice' }],
    totolSales: { type: Number, default: 0, min: 0},
  }, 
  optionsModel as SchemaOptions<BranchOffice>
);

export default model<BranchOffice>('BranchOffice', schema);