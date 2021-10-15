import { Usuario } from './post.interface';

export interface LoginResponse {
  ok: boolean;
  token: string;
}

export interface ValidarTokenResponse {
  ok: boolean;
  usuario: Usuario;
}


