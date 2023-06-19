import admin, { FirebaseError } from 'firebase-admin';
import { CreateUserAuth, UpdateUserAuth } from "../interfaces/firebaseAuth";

const auth = admin.auth();

export const createUserAuth = async (props: CreateUserAuth) => {
  try {
    return await auth.createUser(props);
  } catch (error) {
    const e = error as FirebaseError;

    switch(e.code) {
      case "auth/email-already-exists": 
        throw "Otro usuario ya está utilizando el correo proporcionado."
      case "auth/internal-error": 
        throw "El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud."
      case "auth/invalid-argument": 
        throw "Se proporcionó un argumento no válido para un método de autenticación."
      case "auth/invalid-display-name":
        throw "El displayName no es válido."
      case "auth/invalid-email":
        throw "El email no es válido."
      case "auth/invalid-password": 
        throw "La contraseña debe tener al menos 6 caracteres."
      default: 
        throw e.message
    }
  }
}

export const updateUserAuth = (uid: string, props: UpdateUserAuth) => auth.updateUser(uid, props);

export const deleteUserAuth = (uid: string) => auth.deleteUser(uid);

export const getUserAuthByUid = (uid: string) => auth.getUser(uid);