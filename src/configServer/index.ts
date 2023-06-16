import cors from "cors";
import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import admin from 'firebase-admin';

dotenv.config();
export const server = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: Number(process.env.PORT)
} as const;
const privateKey = `${process.env.PRIVATE_KEY}`;

export const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: privateKey,
  clientEmail: process.env.CLIENT_EMAIL,
} as const;

export const storageBucket = process.env.STORAGE_BUCKET;

const configServer = (app: Application) => {
  app.set('port', server.PORT);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '50mb' }));
  app.use(cors({ origin: true }));
  app.use(express.static(path.join(new URL(import.meta.url).pathname, 'public')));

}

export default configServer;