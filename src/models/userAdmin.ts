import { Schema, SchemaOptions, model } from 'mongoose';
import { maxlength, optionsModel } from '../constants';
import { UserAdmin } from '../interfaces';

const schema = new Schema<UserAdmin>(
  {
    uid: { type: String, max: 64 },
    name: { type: String, required: true, maxlength: 300 },
    email: { type: String, required: true, unique: true, maxlength: 300 },
    phone: { type: Number, maxlength: 10, minlength: 10 },
    company: { type: String, maxlength: 50 },
    description: { type: String, maxlength: 1000, default: "" },
    image: { type: String, maxlength, default: "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/imagenesPerfil%2Fperfil.jpg?alt=media&token=a07f8154-7aaa-4397-a8cf-4aeaee5b0f5e" },
    active: { type: Boolean, required: true },
    rfc: { type: String, unique: true },
    role: { type: String, required: true }
  },
  optionsModel as SchemaOptions<UserAdmin>
);

export default model<UserAdmin>('UserAdmin', schema);