import { Response } from "express";

const handleError = (res: Response, err: any) => res.status(500).json(`${err.code || 500} - ${err.message}`);

export default handleError;