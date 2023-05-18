import AllModels from "../models/allModels";
import { NameModels } from "../types";

export const getByIdAllModelsRepo = async (nameModel: NameModels, id: string) => {
  try {
    const model = AllModels[nameModel];

    return model.findById(id);
  } catch (error) {
    throw "Error al obtener el modelo.";
  }
}