import { isPointInsideCircle } from "../utils/functions";
import BranchOfficeModel from '../models/branchOffice';
import { BranchOffice } from "../interfaces";
import { FilterQuery } from 'mongoose';

export const getBranchOfficeByUid = (uid: string) => BranchOfficeModel.findOne({ uid });

export const findBranchOffice = (query: FilterQuery<BranchOffice>) => BranchOfficeModel.find(query);

export const findByIdBranchOffice = (id: string) => BranchOfficeModel.findById(id);

export const createBranchOffice = (model: BranchOffice) => BranchOfficeModel.create(model);

export const findByIdAndUpdateBranchOffice = (id: string, data: BranchOffice | Record<string, any>) => BranchOfficeModel.findByIdAndUpdate(id, data);

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