import { Response } from "express";
import { MongooseError } from "mongoose";

export const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

export const handleErrorFunction = (error: unknown, message?: string) => {
  console.log(error);
  
	if(typeof error === "string") throw error;
		
  if(error instanceof Error) {
    throw error.message;
  }

  throw message || "Error";
}

export const handleError = (res: Response, err: any) => {
  console.log(err);

  return res.status(500).json(`${err.message ?? err}`)
};

export const handleErrorSaveBranchOffice = (error: unknown) => {
  if(error instanceof MongooseError) {
    if(error.message.includes("BranchOffice validation failed: salesGoalByMonth: ")) {
      throw error.message.split(": ")[2];
    }

    throw error.message;
  }

  console.log(error)

  throw "Error al guardar la sucursal.";
}

export default handleError;