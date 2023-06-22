import { ValidateOpts } from "mongoose";

export const validateMaxLength: ValidateOpts<string> = {
  validator: (value: string) => value.length <= 300,
  message: "El maximo de caracteres permitido es 300."
};

export const validateMaxLengthImage: ValidateOpts<string> = {
  validator: (value: string) => value.length <= 1000,
  message: "El maximo de caracteres permitido para la imagen es 1000."
};