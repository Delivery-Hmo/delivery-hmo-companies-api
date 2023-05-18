import { Response } from "express";

export const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

const handleError = (res: Response, err: any) => {
  console.log(err);

  return res.status(500).json(`${err.message ?? err}`)
};

export default handleError;