import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { serviceAccount, serviceAccountAdmin, storageBucket } from '../configServer';

const app = admin.initializeApp({ credential: cert(serviceAccount), storageBucket });
const appSuperAdmin = admin.initializeApp({ credential: cert(serviceAccountAdmin) }, "appSuperAdmin");

const storage = app.storage();

const auth = app.auth();
const authAdmin = appSuperAdmin.auth();

export {
  app,
  appSuperAdmin,
  storage,
  auth,
  authAdmin
};