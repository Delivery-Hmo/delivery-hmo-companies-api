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
};

export const maxlength = 300;