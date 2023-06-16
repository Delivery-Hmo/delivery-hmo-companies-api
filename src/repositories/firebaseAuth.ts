import admin from 'firebase-admin';
import { CreateUserAuth, UpdateUserAuth } from "../interfaces/firebaseAuth";

const auth = admin.auth();

export const createUserAuth = (props: CreateUserAuth) => auth.createUser(props);

export const updateUserAuth = (uid: string, props: UpdateUserAuth) => auth.updateUser(uid, props);

export const deleteUserAuth = (uid: string) => auth.deleteUser(uid);

export const getUserAuthByUid = (uid: string) => auth.getUser(uid);