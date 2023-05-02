import admin from 'firebase-admin';
import { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';

export const createUserFirebase = (email: string, password: string) => 
  admin.auth().createUser({
    email,
    password
  });

export const updateUserFirebase = (uid: string, properties: UpdateRequest) => 
  admin.auth().updateUser(uid, properties)
