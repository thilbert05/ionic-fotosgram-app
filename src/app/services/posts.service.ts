/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { PostResponse, Post, PostsResponse } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  nuevoPost = new EventEmitter<Post>();
  private _baseUrl = environment.url;
  private _paginaPost = 0;

  constructor(private http: HttpClient) { }

  get baseUrl(){
    return this._baseUrl;
  }

  getPosts(pull: boolean = false) {

    if (pull) {
      this._paginaPost = 0;
    }

    this._paginaPost++;
    return this.http.get<PostsResponse>(
      `${this.baseUrl}/posts/?pagina=${this._paginaPost}&porPagina=10`
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

}
