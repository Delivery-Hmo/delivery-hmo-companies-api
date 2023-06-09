import { Schema, model } from 'mongoose';
import { optionsModel } from '../constants';
import { UserDeliveryMan } from '../interfaces';
import { latLngSchema } from ".";

const schema = new Schema<UserDeliveryMan>(
  {
    uid: { type: String, max: 64 },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    branchOffice: { type: Schema.Types.ObjectId, ref: 'BranchOffice' },
    userAdmin: { type: Schema.Types.ObjectId, ref: 'UserAdmin' },
    password: { type: String },
    latLng: latLngSchema,
  },
  optionsModel
);

export default model<UserDeliveryMan>('UserDeliveryMan', schema);