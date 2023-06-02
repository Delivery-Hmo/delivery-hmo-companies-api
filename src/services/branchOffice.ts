import { isPointInsideCircle } from "../utils/functions";
import BranchOfficeModel from '../models/branchOffice';
import { BranchOffice } from "../interfaces";
import { FilterQuery, Model } from "mongoose";
import { handleErrorFunction } from "../utils/handleError";
import { getPaginatedList } from "../repositories/allModels";
import { Request } from "express";
import { findBranchOffice } from "../repositories/branchOffice";

export const getPaginatedListByUserAdmin = async ({ search, req }: { search: string, req: Request }) => {
  try {
    const userAdmin = global?.user;
    let query: FilterQuery<Model<BranchOffice>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    if (search) {
      query.$or = [
        { name: { "$regex": search, "$options": "i" } },
        { email: { "$regex": search, "$options": "i" } },
      ];
    }

    return await getPaginatedList({ model: BranchOfficeModel, query, populate: "userAdmin", req });
  } catch (error) {
    throw handleErrorFunction(error);
  }
}

export const getListByUserAdmin = async () => {
  try {
    const userAdmin = global?.user;
    const query: FilterQuery<Model<BranchOffice>> = {
      userAdmin: userAdmin?.id,
      active: true,
    };

    return await findBranchOffice(query);
  } catch (error) {
    throw handleErrorFunction(error);
  }
}    

export const validateBranchOffice = async (branchOffice: BranchOffice) => {
  const { latLng, center, radius, email, phones, name } = branchOffice;

  if (!latLng.lat || !latLng.lng) {
    return "La ubicación de la sucursal es obligatoria.";
  }

  if (!radius || !center.lat || !center.lng) {
    return "El radio de entrega es obligatorio.";
  }

  const latLngInCircle = isPointInsideCircle(latLng.lat, latLng.lng, center.lat, center.lng, radius);

  if(!latLngInCircle) {
    return "La ubicación de la sucursal esta fuera del radio.";
  }

  for (const phone of phones) {
    if(phone && phone?.toString().length !== 10) {
     "Los números telefónicos tiene que ser de 10 dígitos.";
    }
  }

  const otherModelSameEmail = await BranchOfficeModel.findOne({ email });

  if(otherModelSameEmail && otherModelSameEmail?.id !== branchOffice.id) {
    return "Ya existe una sucursal con este correo.";
  }

  const otherModelSameName = await BranchOfficeModel.findOne({ name });

  if(otherModelSameName && otherModelSameName?.id !== branchOffice.id) {
    return "Ya existe una sucursal con este nombre.";
  }

  return "";
}