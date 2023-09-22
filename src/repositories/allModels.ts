import AllModels from "../models/allModels";
import { NameModels } from "../types";

export const getByIdAllModels = async (nameModel: NameModels, id: string) => {
  try {
    const model = AllModels()[nameModel];

    return await model.findById(id);
  } catch (error) {
    console.log(error);
    throw "Error al obtener el modelo.";
  }
}