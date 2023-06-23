import { CreateRequest, UpdateRequest } from 'firebase-admin/lib/auth/auth-config';

export interface CreateUserAuth extends CreateRequest {
  displayName?: Rols;
}

export interface UpdateUserAuth extends UpdateRequest {
  displayName?: Rols;
}