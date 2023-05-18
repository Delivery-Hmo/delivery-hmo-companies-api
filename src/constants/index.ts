import { SchemaOptions } from "mongoose";

export const optionsModel: SchemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  },
  strict: "throw"
} as const;

export const maxlength = 300;
export const urlImageDefaultProfile = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/imagenesPerfil%2Fperfil.jpg?alt=media&token=a07f8154-7aaa-4397-a8cf-4aeaee5b0f5e";
export const baseUrlStorage = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/";
