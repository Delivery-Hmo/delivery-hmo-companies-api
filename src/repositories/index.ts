import { PropsPaginatedList } from "../interfaces";
import AllModels from "../models/allModels";
import { GenericDocument, NameModels } from "../types";

export const getByIdAllUsersModel = async <T extends {}>(nameModel: NameModels, id: string) => {
  try {
    const model = AllModels<T>()[nameModel];

    return model.findById(id);
  } catch (error) {
    console.log(error);
    throw error;
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
    throw error;
  }
}