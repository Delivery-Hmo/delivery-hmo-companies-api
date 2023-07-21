import { PropsPaginatedList } from "../interfaces";
import { GenericDocument } from "../types";

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