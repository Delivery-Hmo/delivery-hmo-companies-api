import mongoose from "mongoose";

const startDb = () => {
  const conn = process.env.ENVIRONMENT === 'serve' ? process.env.DB_CONN_STRING_PRODUCTION as string : process.env.DB_CONN_STRING as string;
  
  return mongoose.connect(conn);
}

export default startDb;