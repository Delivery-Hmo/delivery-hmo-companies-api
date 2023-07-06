import { Schema, model } from 'mongoose';
import { maxlength, optionsModel } from '../constants';
import { validateMaxLength } from "../utils/mongoose";
import { UserDeliveryMan } from "../interfaces/users";
import { schemalatLng } from ".";

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
    latLng: schemalatLng(),
    role: { type: String, default: "Repartidor" }
  },
  optionsModel
);

export default model<UserDeliveryMan>('UserDeliveryMan', schema);