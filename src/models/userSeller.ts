import { Schema, model } from 'mongoose';
import { maxlength, optionsModel, validateMaxLength, phone } from '../constants';
import { UserSeller } from "../interfaces/users";
import { findOneUserSeller } from '../repositories/userSeller';
import { ModelDefinition } from '../types';

type UserSellerModelInterface = Omit<UserSeller, "id" | "image" | "password">;

const definition: ModelDefinition<UserSellerModelInterface> = {
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
  role: {
    type: String,
    default: "Vendedor"
  },
  rfc: {
    type: String,
  }
}

export const schema = new Schema<UserSeller>(
  definition,
  optionsModel
);

schema.pre<UserSeller>('save', async function (next) {
  const { name, id } = this;

  const otherModelSameName = await findOneUserSeller({ name });

  if (otherModelSameName && otherModelSameName?.id !== id) {
    throw "Ya existe una vendedor con este nombre.";
  }

  next();
});

export default model<UserSeller>('UserSeller', schema);