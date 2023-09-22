import { Schema, model } from 'mongoose';
import { schemalatLng } from '..';
import { maxlength, optionsModel, validateMaxLength } from '../../constants';
import { isPointInsideCircle } from "../../utils/functions";
import { findOneBranchOffice } from "../../repositories/branchOffice";
import { BranchOffice } from "../../interfaces/users";
import { shemaBranchProduct } from "./brachOfficeProducts";
import { ModelDefinition } from "../../types";

//Quitar de la interface las propiedades que no son del modelo
type BranchOfficeModelInterface = Omit<BranchOffice, "comments" | "id" | "password" | "image">;

const definition: ModelDefinition<BranchOfficeModelInterface> = {
  uid: {
    type: String,
    required: [true, "El uid es obligatorio."],
    unique: true,
    maxlength,
    validate: validateMaxLength
  },
  userAdmin: {
    type: Schema.Types.ObjectId,
    ref: 'UserAdmin',
    required: [true, "La empresa de la succursal es obligatoria."]
  },
  email: {
    type: String,
    required: [true, "El email de la sucursal es obligatorio."],
    unique: true,
    maxlength,
    validate: validateMaxLength
  },
  name: {
    type: String,
    required: [true, "El nombre de la sucursal es obligatorio."],
    unique: true,
    maxlength,
    validate: validateMaxLength
  },
  salesGoalByMonth: {
    type: Number,
    default: 0,
    validate: {
      validator: (value: number) => value >= 0 && value <= 100000,
      message: "La meta de ventas por mes está fuera de rango."
    }
  },
  facebook: {
    type: String,
    maxlength,
    validate: validateMaxLength
  },
  phones: { type: [Number] },
  latLng: schemalatLng(true),
  center: schemalatLng(true),
  radius: {
    type: Number,
    required: [true, "El radio de entrega es obligatorio."],
    validate: {
      validator: (value: number) => {
        value >= 1000 && value <= 3800
      },
      message: "El radio de entrega está fuera de rango."
    }
  },
  address: {
    type: String,
    maxlength,
    validate: validateMaxLength
  },
  active: {
    type: Boolean,
    default: true
  },
  validatedImages: {
    type: Boolean,
    default: false
  },
  validatingImages: {
    type: Boolean,
    default: false
  },
  showInApp: {
    type: Boolean,
    default: false
  },
  totolSales: {
    type: Number,
    default: 0,
    validate: {
      validator: (value: number) => value <= 100000,
      message: "El total de ventas por mes no puede ser mayor a 100000"
    }
  },
  role: {
    type: String,
    default: "Administrador sucursal"
  },
  description: {
    type: String,
    maxlength,
    validate: validateMaxLength
  },
  products: [shemaBranchProduct],
  images: [String],
  rfc: {
    type: String,
    unique: true,
    validate: {
      validator: (value: string) => value.length === 13,
      message: "El rfc debe tener 13 caracteres."
    }
  }
}

export const schema = new Schema<BranchOffice>(
  definition,
  optionsModel
);

schema.pre<BranchOffice>('save', async function (next) {
  const { latLng, center, radius, name, id, phones } = this;

  const invalidPhones = phones.some(value => value && value.toString().length !== 10);

  if (invalidPhones) {
    throw "Los números telefónicos tienen que ser de 10 dígitos.";
  }

  const latLngInCircle = isPointInsideCircle(latLng.lat, latLng.lng, center.lat, center.lng, radius);

  if (!latLngInCircle) {
    throw "La ubicación de la sucursal está fuera del radio.";
  }

  const otherModelSameName = await findOneBranchOffice({ name });

  if (otherModelSameName && otherModelSameName?.id !== id) {
    throw "Ya existe una sucursal con este nombre.";
  }

  next();
});

export default model<BranchOffice>('BranchOffice', schema);