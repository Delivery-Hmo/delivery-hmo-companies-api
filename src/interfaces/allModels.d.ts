import { Request } from "express";
import { FilterQuery, Model } from "mongoose";

export interface PropsPaginatedList<T> {
  model: Model<T>;
  query: FilterQuery<Model<T>>; 
  populate: string | string[];
  page: number;
  limit: number;
}