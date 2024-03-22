import { PropsPaginatedList } from "../interfaces";
import AllModels from "../models/allModels";
import { NameModels } from "../types";

export const getByIdAllUserModels = async <T extends {}>(nameModel: NameModels, id: string) => {
  try {
    const model = AllModels<T>()[nameModel];

    return model.findById(id);
  } catch (error) {
    throw error;
  }
};

export const getPaginatedList = async <T extends {}>({ model, query, populate, page, limit }: PropsPaginatedList<T>) => {
  try {
    const list = await model.find(query).limit(limit).skip((page - 1) * limit).populate(populate);
    const total = await model.countDocuments(query);

    return {
      list,
      total
    };
  } catch (error) {
    throw error;
  }
};