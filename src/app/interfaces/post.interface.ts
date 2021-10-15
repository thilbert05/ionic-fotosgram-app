/* eslint-disable @typescript-eslint/naming-convention */

export interface PostsResponse {
  ok:     boolean;
  pagina: number;
  posts:  Post[];
}

export interface PostResponse {
  ok:     boolean;
  post:  Post;
}

export interface Post {
  _id?:     string;
  mensaje?: string;
  imgs?:    string[];
  coords?:  string;
  usuario?: Usuario;
  created?: string;
  posicion?: boolean;
}


export interface Usuario {
  _id?:    string;
  nombre?: string;
  avatar?: string;
  email?:  string;
  password?: string;
}


