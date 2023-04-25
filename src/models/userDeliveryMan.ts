import { Schema, SchemaOptions, model } from 'mongoose';
import { optionsModel } from '../constants';
import { UserDeliveryMan } from '../interfaces';

const schema = new Schema<UserDeliveryMan>(
  {
    uid: { type: String, max: 64 },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    deliveryMan: { type: Boolean, required: true },
    deliveryManProps: { location: Number },
    branchOffice: { type: Schema.Types.ObjectId, ref: 'BranchOffice' },
    userAdmin: { type: Schema.Types.ObjectId, ref: 'UserAdmin' },
    password: {type: String},
  },
  optionsModel as SchemaOptions<UserDeliveryMan>
);

export default model<UserDeliveryMan>('UserDeliveryMan', schema);