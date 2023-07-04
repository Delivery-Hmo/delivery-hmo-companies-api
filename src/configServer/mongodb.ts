import { Server } from "http";
import mongoose from "mongoose";

export const connectDB = () => {
  const { LOGNAME } = process.env;
  const conn = LOGNAME === 'admin' ? process.env.DB_CONN_STRING_PRODUCTION as string : process.env.DB_CONN_STRING as string;

  return mongoose.connect(conn);
}


export const disconnectDB = (expressServer: Server) =>
  expressServer.on('connection', connection => {
    connection.on('close', async () => {
      try {
        await mongoose.disconnect();
        process.exit(0);
      } catch (error) {
        console.log("Error al desconectar la base de datos!");
        console.log(error);
        process.exit(1);
      }
    });
  });

  
