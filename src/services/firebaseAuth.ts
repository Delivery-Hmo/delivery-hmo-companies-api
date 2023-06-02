import admin from 'firebase-admin';
import { UpdateRequest } from 'firebase-admin/lib/auth/auth-config';
import { Rols } from "../types";

interface UserProperties extends UpdateRequest {
  displayName?: Rols;
}

const auth = admin.auth();

export const createUserAuth = (email: string, password: string, displayName: Rols) => 
  auth.createUser({
    email,
    password,
    displayName,
  });

export const updateUserAuth = (uid: string, properties: UserProperties) => 
  auth.updateUser(uid, properties);

export const deleteUserAuth = (uid: string) => auth.deleteUser(uid);
