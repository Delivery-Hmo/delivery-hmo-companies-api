import { Request } from "express";
import { SchemaDefinitionProperty } from "mongoose";

export type ModelDefinition<M> = {
  [P in keyof M]-?: SchemaDefinitionProperty<M[P]>;
};

export interface LatLng {
  lat: number;
  lng: number;
}

export interface BodyDisable {
  id: string;
  active: boolean;
}

export interface PropsPaginatedList<T> {
  model: Model<T>;
  query: FilterQuery<Model<T>>;
  populate: string | string[];
  page: number;
  limit: number;
};