import { Schema, model } from 'mongoose';
import { maxlengthImage, optionsModel, urlImageDefaultProfile } from '../constants';
import { UserAdmin } from '../interfaces';

const schema = new Schema<UserAdmin>(
  {
    uid: { type: String, max: 64 },
    name: { type: String, required: true, maxlength: 300 },
    email: { type: String, required: true, unique: true, maxlength: 300 },
    phone: { type: Number, maxlength: 10, minlength: 10 },
    company: { type: String, maxlength: 50 },
    description: { type: String, maxlength: 1000, default: "" },
    image: { type: String, maxlength: maxlengthImage, default: urlImageDefaultProfile },
    active: { type: Boolean, required: true },
    rfc: { type: String, unique: true },
    role: { type: String, required: true }
  },
  optionsModel
);

export default model<UserAdmin>('UserAdmin', schema);