import cors from "cors";
import { Application, urlencoded, json, static as s } from "express";
import path from "path";
import dotenv from "dotenv";
import admin from 'firebase-admin';

dotenv.config();
console.log(process.env.PRIVATE_KEY)
export const server = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: Number(process.env.PORT)
});

export const serviceAccount: admin.ServiceAccount = Object.freeze({
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
});

export const storageBucket = process.env.STORAGE_BUCKET;

const configServer = (app: Application) => {
  app.set('port', server.PORT);
  app.use(urlencoded({ extended: true }));
  app.use(json({ limit: '50mb' }));
  app.use(cors({ origin: true }));
  app.use(s(path.join(new URL(import.meta.url).pathname, 'public')));
}

export default configServer;