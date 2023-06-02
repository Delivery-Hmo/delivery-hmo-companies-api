import { FilterQuery, Model } from "mongoose";
import { Request } from "express";

export interface PropsPaginatedList<T> {
  model: Model<T>;
  query: FilterQuery<Model<T>>; 
  populate: string | string[];
  req: Request; 
}
