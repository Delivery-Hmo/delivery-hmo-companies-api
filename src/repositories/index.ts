import AllModels from "../models/allModels";
import { NameModels } from "../types";
import { GenericDocument } from "../types";
import { PropsPaginatedList } from "../interfaces/allModels";
import { Model } from "mongoose";

export const getByIdAllUsersModel = async <T extends {}>(nameModel: NameModels, id: string) => {
  try {
    const model = AllModels[nameModel] as Model<T>;

    return model.findById(id);
  } catch (error) {
    console.log(error);
    throw "Error al obtener el modelo.";
  }
}

export const getPaginatedList = async <T extends {}>({ model, query, populate, page, limit }: PropsPaginatedList<T>) => {
  try {
    const list = await model.find(query).limit(limit).skip((page - 1) * limit).populate(populate) as GenericDocument<T>[];
    const total = await model.countDocuments(query);
  
    return {
      list,
      total
    };
  } catch (error) {
    console.log(error);
    throw "Error al obtener la lista";
  }
}