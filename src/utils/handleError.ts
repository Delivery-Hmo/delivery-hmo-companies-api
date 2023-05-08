import { Response } from "express";

const handleError = (res: Response, err: any) => res.status(500).json(`${err.message ?? err}`);

export default handleError;