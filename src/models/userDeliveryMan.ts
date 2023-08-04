import { Schema, model } from 'mongoose';
import { maxlength, optionsModel, phone, maxlengthImage, urlImageDefaultProfile, validateMaxLength, validateMaxLengthImage } from '../constants';
import { UserDeliveryMan } from "../interfaces/users";
import { schemalatLng } from ".";
import { ModelDefinition } from '../types';

type UserDeliveryManModelInterface = Omit<UserDeliveryMan, "id" | "password">;

const definition: ModelDefinition<UserDeliveryManModelInterface> = {
  uid: {
    type: String,
    required: [true, "El uid es obligatorio."],
    unique: true,
    maxlength,
    validate: validateMaxLength
  },
  email: {
    type: String,
    required: [true, "El email del repartidor es obligatorio."],
    unique: true,
    maxlength,
    validate: validateMaxLength
  },
  name: {
    type: String,
    required: [true, "El nombre del repartidor es obligatorio."],
    maxlength,
    validate: validateMaxLength
  },
  phone,
  description: {
    type: String,
    maxlength,
  },
  active: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    maxlength: maxlengthImage,
    default: urlImageDefaultProfile,
    validate: validateMaxLengthImage
  },
  branchOffice: {
    type: Schema.Types.ObjectId,
    ref: 'BranchOffice',
  },
  userAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'UserAdmin',
    required: [true, "El administrador de la sucursal es obligatorio."]
  },
  latLng: schemalatLng(),
  role: {
    type: String,
    default: "Repartidor"
  },

};

const schema = new Schema<UserDeliveryMan>(
  definition,
  optionsModel
);

export default model<UserDeliveryMan>('UserDeliveryMan', schema);