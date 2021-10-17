/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { UsuarioService } from './usuario.service';

import { environment } from '../../environments/environment';

import { PostResponse, Post, PostsResponse } from '../interfaces/post.interface';

import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  nuevoPost = new EventEmitter<Post>();
  paginaPost = 0;
  private _baseUrl = environment.url;

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private fileTransfer: FileTransfer) { }

  get baseUrl(){
    return this._baseUrl;
  }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPost = 0;
    }

    this.paginaPost++;
    return this.http.get<PostsResponse>(
      `${this.baseUrl}/posts/?pagina=${this.paginaPost}&porPagina=10`
    );
  }

  crearPost(post: Post) {
    return new Promise((resolve, reject) => {
      this.http
        .post<PostResponse>(`${this.baseUrl}/posts`, post)
        .subscribe((resp) => {
          console.log(resp);
          this.nuevoPost.emit(resp.post);
          resolve(true);
        },(err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async subirImagen(img: string) {
    await this.usuarioService.cargarToken();
    const options: FileUploadOptions = {
      fileKey: 'image',
      httpMethod: 'POST',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer
      .upload(img, `${this.baseUrl}/posts/upload`, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log('error en subir la imagen', err);
      });
  }

}
