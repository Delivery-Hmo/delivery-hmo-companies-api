import { Schema, model } from 'mongoose';
import { maxlength, maxlengthImage, optionsModel, phone, urlImageDefaultProfile, validateMaxLength, validateMaxLengthImage } from '../constants';
import { findOneUserAdmin } from "../repositories/userAdmin";
import { UserAdmin } from "../interfaces/users";
import { ModelDefinition } from '../types';

type UserAdminModelInterface = Omit<UserAdmin, "id" | "password" | "rfc">;

const definition: ModelDefinition<UserAdminModelInterface> = {
  uid: {
    type: String,
    required: [true, "El uid es obligatorio."],
    unique: true,
    maxlength,
    validate: validateMaxLength
  },
  email: {
    type: String,
    required: [true, "El correo electronico de la empresa es obligatorio."],
    unique: true,
    maxlength,
    validate: validateMaxLength
  },
  name: {
    type: String,
    required: [true, "El nombre de la empresa es obligatorio."],
    maxlength,
    validate: validateMaxLength
  },
  phone,
  description: {
    type: String,
    maxlength,
  },
  image: {
    type: String,
    maxlength: maxlengthImage,
    default: urlImageDefaultProfile,
    validate: validateMaxLengthImage
  },
  active: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: "Administrador",
  }
};

export const schema = new Schema<UserAdmin>(
  definition,
  optionsModel
);

schema.pre<UserAdmin>("save", async function (next) {
  const { name, id } = this;

  const otherModelSameName = await findOneUserAdmin({ name });

  if (otherModelSameName && otherModelSameName?.id !== id) {
    throw "Ya existe un administrador con el mismo nombre.";
  }

  next();
});

export default model<UserAdmin>("UserAdmin", schema);