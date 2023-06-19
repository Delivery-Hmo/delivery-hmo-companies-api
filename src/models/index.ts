import { Schema } from 'mongoose';
import { LatLng } from "../interfaces";

export const latLngSchema = (required?: boolean) => {
  const req = required === undefined ? true : required;

  return new Schema<LatLng>({
    lat: {
      type: Number, 
      required: [req, "La latidud es obligatoria."],
      validate: {
        validator: (value: number) => value >= -180 && value <= 180 || !required,
        message: "La latitud esta fuera de rango."
      }
    },
    lng: { 
      type: Number, 
      required: [req, "La longitud es obligatoria."],
      validate: {
        validator: (value: number) => value >= -180 && value <= 180 || !required,
        message: "La longitud esta fuera de rango."
      } 
    }
  });
}