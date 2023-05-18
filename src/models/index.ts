import { Schema } from 'mongoose';


export const latLngSchema = new Schema({
  lat: { type: Number, required: true, default: 0 },
  lng: { type: Number, required: true, default: 0 }
});