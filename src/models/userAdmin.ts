import { Schema, SchemaOptions, model } from 'mongoose';
import { optionsModel } from '../constants';
import { UserAdmin } from '../interfaces';

const schema = new Schema<UserAdmin>(
  {
    uid: { type: String, max: 64 },
    name: { type: String, required: true, maxlength: 300 },
    email: { type: String, required: true, unique: true, maxlength: 300 },
    phone: { type: Number, maxlength: 10, minlength: 10 }, 
    company: { type: String, maxlength: 50 }, 
    description: { type: String, maxlength: 1000, default: "" }, 
    imagen: { type: String, maxlength: 2000, default: "" }, 
    active: { type: Boolean, required: true, default: true },
    rfc: {type: String, required: true, unique: true}
  }, 
  optionsModel as SchemaOptions<UserAdmin>
);

export default model<UserAdmin>('UserAdmin', schema);