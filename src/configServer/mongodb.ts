import mongoose from "mongoose";
import { handleErrorFunction } from "../utils/handleError";

export const connectDB = async () => {
  try {
    const { LOGNAME } = process.env;
    const conn = LOGNAME === 'admin' ? process.env.DB_CONN_STRING_PRODUCTION as string : process.env.DB_CONN_STRING as string;
  
    return await mongoose.connect(conn);
  } catch (error) {
    throw handleErrorFunction(error);
  }
}