import { Response } from "express";

export const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

export const handleErrorFunction = (error: unknown, message?: string) => {
  console.log(error);
  
	if(typeof error === "string") throw error;
		
  if(error instanceof Error) {
    throw error.message;
  }

  throw message || "Error";
}

const handleError = (res: Response, err: any) => {
  console.log(err);

  return res.status(500).json(`${err.message ?? err}`)
};

export default handleError;