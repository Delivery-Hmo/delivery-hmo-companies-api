import { FilterQuery, Model } from "mongoose";
import BranchOfficeModel from '../models/branchOffice';
import { BranchOffice, UserAdmin } from "../interfaces";
import { isPointInsideCircle } from "../utils/functions";
import { handleErrorFunction } from "../utils/handleError";
import { findBranchOffice, findOneBranchOffice } from "../repositories/branchOffice";
import { getPaginatedList } from "../repositories/allModels";

export const getPaginatedListByUserAdmin = async ({ search, page, limit }: { search: string, page: number, limit: number }) => {
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

    return await getPaginatedList({ model: BranchOfficeModel, query, populate: "userAdmin", page, limit });
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

export const newBranchOffice = async (branchOffice: BranchOffice) => {
  try {
    const { latLng, center, radius, email, phones, name, password } = branchOffice;

    if (password && password?.length < 6) {
      throw "La contraseña debe tener al menos 6 caracteres.";
    }

    if (!latLng.lat || !latLng.lng) {
      throw "La ubicación de la sucursal es obligatoria.";
    }

    if (!radius || !center.lat || !center.lng) {
      throw "El radio de entrega es obligatorio.";
    }

    const latLngInCircle = isPointInsideCircle(latLng.lat, latLng.lng, center.lat, center.lng, radius);

    if (!latLngInCircle) {
      throw "La ubicación de la sucursal esta fuera del radio.";
    }

    for (const phone of phones) {
      if (phone && phone.toString().length !== 10) {
        throw "Los números telefónicos tiene que ser de 10 dígitos.";
      }
    }

    const otherModelSameEmail = await findOneBranchOffice({ email });

    if (otherModelSameEmail && otherModelSameEmail?.id !== branchOffice.id) {
      throw "Ya existe una sucursal con este correo.";
    }

    const otherModelSameName = await findOneBranchOffice({ name });

    if (otherModelSameName && otherModelSameName?.id !== branchOffice.id) {
      throw "Ya existe una sucursal con este nombre.";
    }

    const userAdmin = global?.user;
    branchOffice.userAdmin = userAdmin as UserAdmin;
    branchOffice.active = true;
    branchOffice.role = "Administrador sucursal";

    return branchOffice;
  } catch (error) {
    throw handleErrorFunction(error);
  }
}