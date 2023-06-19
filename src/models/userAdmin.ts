import { Schema, model } from 'mongoose';
import { maxlength, maxlengthImage, optionsModel, urlImageDefaultProfile } from '../constants';
import { UserAdmin } from '../interfaces';
import { validateMaxLength } from "../utils/mongoose";

const schema = new Schema<UserAdmin>(
  {
    uid: { type: String, maxlength },
    email: { 
      type: String, 
      required: [true, "El email de la empresa es obligatorio."],
      unique: true, 
      maxlength,
      validate: validateMaxLength
    },
    name: { type: String, required: true, maxlength: 300 },
    phone: { type: Number, maxlength: 10, minlength: 10 },
    company: { type: String, maxlength },
    description: { type: String, maxlength, default: "" },
    image: { type: String, maxlength: maxlengthImage, default: urlImageDefaultProfile },
    active: { type: Boolean, required: true },
    rfc: { type: String, unique: true },
    role: { type: String, required: true }
  },
  optionsModel
);

export default model<UserAdmin>('UserAdmin', schema);