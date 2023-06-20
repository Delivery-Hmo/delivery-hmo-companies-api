import { Schema, model } from 'mongoose';
import { maxlength, optionsModel } from '../constants';
import { UserDeliveryMan } from '../interfaces';
import { latLngSchema } from ".";
import { validateMaxLength } from "../utils/mongoose";

const schema = new Schema<UserDeliveryMan>(
  {
    uid: { type: String, max: 64 },
    email: { 
      type: String, 
      required: [true, "El email del repartidor es obligatorio."],
      unique: true, 
      maxlength,
      validate: validateMaxLength
    },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    branchOffice: { type: Schema.Types.ObjectId, ref: 'BranchOffice' },
    userAdmin: { type: Schema.Types.ObjectId, ref: 'UserAdmin' },
    password: { type: String },
    latLng: latLngSchema(),
    role: { type: String, default: "Repartidor" }
  },
  optionsModel
);

export default model<UserDeliveryMan>('UserDeliveryMan', schema);