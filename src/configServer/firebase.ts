
import dotenv from "dotenv";

dotenv.config();

import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { serviceAccount, storageBucket } from '../configServer';

const app = admin.initializeApp({ credential: cert(serviceAccount), storageBucket });
const appSuperAdmin = admin.initializeApp({ credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS_SUPERADMIN!) }, "appSuperAdmin");

const storage = app.storage();

const auth = app.auth();
const authSuperAdmin = appSuperAdmin.auth();

export {
  app,
  appSuperAdmin,
  storage,
  auth,
  authSuperAdmin
};