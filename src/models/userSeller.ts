import { Schema, model, SchemaOptions } from 'mongoose';
import { maxlength, maxlengthImage, optionsModel, urlImageDefaultProfile } from '../constants';
import { validateMaxLength } from "../utils/mongoose";
import { UserSeller } from "../interfaces/users";

const schema = new Schema<UserSeller>(
  {
    uid: { type: String, required: true },
    email: { 
      type: String, 
      required: [true, "El email de la sucursal es obligatorio."],
      unique: true, 
      maxlength,
      validate: validateMaxLength
    },
    name: { type: String, required: true, maxlength },
    phone: { type: Number, required: true, maxlength: 10, minlength: 10 }, 
    active: { type: Boolean, required: true, default: true },
    branchOffice: { type: Schema.Types.ObjectId, ref: 'BranchOffice', required: true },
    userAdmin: { type: Schema.Types.ObjectId, ref: 'UserAdmin', required: true },
    description: { type: String },
    image: { type: String, maxlength: maxlengthImage, default: urlImageDefaultProfile },
    role: { type: String, default: "Vendedor" }
  }, 
  optionsModel as SchemaOptions<UserSeller>
);

export default model<UserSeller>('UserSeller', schema);
