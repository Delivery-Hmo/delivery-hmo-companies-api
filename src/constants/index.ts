import { SchemaDefinitionProperty, SchemaOptions, ValidateOpts } from "mongoose";

export const optionsModel: SchemaOptions<any> = {
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
export const phone: SchemaDefinitionProperty<number | undefined> = {
  type: Number,
  required: true,
  validate: {
    validator: (value: number) => value.toString().length === 10,
    message: "El número telefónico tienen que ser de 10 dígitos."
  }
} as const;
export const validateMaxLength: ValidateOpts<string> = {
  validator: (value: string) => value.length <= 300,
  message: "El maximo de caracteres permitido es 300."
};
export const validateMaxLengthImage: ValidateOpts<string> = {
  validator: (value: string) => value.length <= 1000,
  message: "El maximo de caracteres permitido para la imagen es 1000."
};
export const maxlength = 300;
export const maxlengthImage = 1000;
export const urlImageDefaultProfile = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/imagenesPerfil%2F1467646262_522853_1467646344_noticia_normal.jpg?alt=media&token=f6e761ad-95c5-462f-bc39-0e889ac30a5c";
export const baseUrlStorage = "https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/";
export const baseUrlStorageGoogle = "https://storage.googleapis.com/delivery-hmo.appspot.com/";
