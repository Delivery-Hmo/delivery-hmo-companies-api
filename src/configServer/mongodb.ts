import mongoose from "mongoose";

export const connectDB = () => {
  const { LOGNAME } = process.env;
  const conn = LOGNAME === 'admin' ? process.env.DB_CONN_STRING_PRODUCTION as string : process.env.DB_CONN_STRING as string;
  
  return mongoose.connect(conn);
}

export const disconnectDB = () => mongoose.disconnect();