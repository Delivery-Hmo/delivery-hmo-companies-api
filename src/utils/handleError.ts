import { Response } from "express";
import { MongooseError } from "mongoose";

export const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

export const handleErrorFunction = (error: unknown) => {
  console.log(error);
  
	if(typeof error === "string") throw error;
		
  if(error instanceof Error) {
    throw error.message;
  }

  throw "Error en el servidor!";
}

export const handleError = (res: Response, err: any) => {
  console.log(err);

  return res.status(500).json(`${err.message ?? err}`)
};

export const handleErrorSaveBranchOffice = (error: unknown) => {
  console.log(error)

  if(error instanceof MongooseError) {
    if(error.message.includes("BranchOffice validation failed: salesGoalByMonth: ")) {
      throw error.message.split(": ")[2];
    }

    throw error.message;
  }

  throw "Error al guardar la sucursal.";
}

export default handleError;