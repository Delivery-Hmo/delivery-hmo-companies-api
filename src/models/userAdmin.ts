import { Schema, model } from 'mongoose';
import { maxlength, maxlengthImage, optionsModel, urlImageDefaultProfile, phone, validateMaxLength, validateMaxLengthImage } from '../constants';
import { findOneUserAdmin } from "../repositories/userAdmin";
import { UserAdmin } from "../interfaces/users";

const schema = new Schema<UserAdmin>(
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
    rfc: {
      type: String,
      unique: true
    },
    role: {
      type: String,
      default: "Administrador",
    },
    validatedImages: {
      type: Boolean,
      default: false
    },
    validatingImages: {
      type: Boolean,
      default: false
    },
    images: [String],
  },
  optionsModel
);

schema.pre<UserAdmin>('save', async function (next) {
  const { id, rfc } = this;

  if (rfc) {
    const otherModelSameRfc = await findOneUserAdmin({ rfc: this.rfc });

    if (otherModelSameRfc && otherModelSameRfc?.id !== id) {
      throw "Ya existe una emprsa con este RFC.";
    }
  }

  next();
});

export default model<UserAdmin>('UserAdmin', schema);