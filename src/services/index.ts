import { Request } from "express";
import { Model, FilterQuery, Types, Document } from 'mongoose';

type List<T> = (Document<unknown, {}, T> & Omit<T & {
  _id: Types.ObjectId;
}, never>)[]

interface PropsPaginatedList<T> {
  model: Model<T>;
  query: FilterQuery<Model<T>>; 
  populate: string | string[];
  req: Request; 
}

export const getPaginatedList = async <T extends {}>({ model, query, populate, req }: PropsPaginatedList<T>) => {
  const { page, limit } = req.query;

  const list = await model.find(query).limit(Number(limit)).skip((Number(page) - 1) * Number(limit)).populate(populate) as List<T>;
  const total = await model.countDocuments(query);

  return {
    list,
    total
  };
}