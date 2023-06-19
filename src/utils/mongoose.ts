import { ValidateOpts } from "mongoose";

export const validateMaxLength: ValidateOpts<string> = {
  validator: (value: string) => value.length <= 300,
  message: "El maximo de caracteres permitido es 300."
};