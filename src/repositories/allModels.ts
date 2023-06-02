import AllModels from "../models/allModels";
import { NameModels } from "../types";
import { GenericDocument } from "../types";
import { PropsPaginatedList } from "../interfaces/allModels";

export const getByIdAllModels = async (nameModel: NameModels, id: string) => {
  try {
    const model = AllModels[nameModel];

    return model.findById(id);
  } catch (error) {
    console.log(error);
    throw "Error al obtener el modelo.";
  }
}

export const getPaginatedList = async <T extends {}>({ model, query, populate, req }: PropsPaginatedList<T>) => {
  const { page, limit } = req.query;

  const list = await model.find(query).limit(Number(limit)).skip((Number(page) - 1) * Number(limit)).populate(populate) as GenericDocument<T>[];
  const total = await model.countDocuments(query);

  return {
    list,
    total
  };
}