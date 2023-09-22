import { Schema } from 'mongoose';
import { ProductBranchOffice } from "../../interfaces/productBranchOffice";

export const shemaBranchProduct = new Schema<ProductBranchOffice>({
  otherPrice: { 
    type: Number, 
    validate: {
      validator: (value: number) => value >= 0 && value <= 1000000,
      message: "El precio esta fuera de rango."
    },
  },
  otherDiscount: {
    type: Number, 
    validate: {
      validator: (value: number) => value >= 0 && value <= 100,
      message: "El porcentaje de descuento esta fuera de rango."
    },
  },
  otherDiscountedPrice: {
    type: Number, 
    validate: {
      validator: (value: number) => value >= 0 && value <= 1000000,
      message: "El descuento esta fuera de rango."
    },
  },
  activeOtherDiscount: {
    type: Boolean,
    default: false,
  },
  activeOtherPrice: {
    type: Boolean,
    default: false,
  }
});