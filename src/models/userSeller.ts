import { Schema, model, SchemaOptions } from 'mongoose';
import { maxlength, maxlengthImage, optionsModel, urlImageDefaultProfile, validateMaxLength, phone, validateMaxLengthImage } from '../constants';
import { UserSeller } from "../interfaces/users";

const schema = new Schema<UserSeller>(
  {
    uid: {
      type: String,
      required: [true, "El uid es obligatorio."],
      unique: true,
      maxlength,
      validate: validateMaxLength
    },
    email: {
      type: String,
      required: [true, "El email del vendedor es obligatorio."],
      unique: true,
      maxlength,
      validate: validateMaxLength
    },
    name: {
      type: String,
      required: [true, "El nombre del vendedor es obligatorio."],
      maxlength,
      validate: validateMaxLength
    },
    phone,
    active: {
      type: Boolean,
      default: true
    },
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'BranchOffice',
      required: [true, "La sucursal ah la que pertenece el vendedor es obligatoria"]
    },
    userAdmin: {
      type: Schema.Types.ObjectId,
      ref: 'UserAdmin',
      required: [true, "El usuario es obligatorio"]
    },
    description: {
      type: String,
      maxlength,
      validate: validateMaxLength
    },
    image: {
      type: String,
      maxlength: maxlengthImage,
      default: urlImageDefaultProfile,
      validate: validateMaxLengthImage
    },
    role: {
      type: String,
      default: "Vendedor"
    }
  },
  optionsModel as SchemaOptions<UserSeller>
);

export default model<UserSeller>('UserSeller', schema);
