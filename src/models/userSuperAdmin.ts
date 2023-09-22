import { Schema, model } from 'mongoose';
import { maxlength, maxlengthImage, optionsModel, urlImageDefaultProfile, validateMaxLength, validateMaxLengthImage } from '../constants';
import { SuperAdmin } from "../interfaces/users";
import { ModelDefinition } from "../types";

type SuperAdminModelInterface = Omit<SuperAdmin, "id" | "password">;

const definition: ModelDefinition<SuperAdminModelInterface> = {
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
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: (value: number) => value.toString().length === 10,
      message: "El número telefónico tienen que ser de 10 dígitos."
    }
  },
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
    default: "SuperAdmin",
  }
};

const schema = new Schema<SuperAdmin>(
  definition,
  optionsModel
);

export default model<SuperAdmin>('SuperAdmin', schema);