/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { environment } from '../../environments/environment';

import { LoginResponse, ValidarTokenResponse } from '../interfaces/login.interface';
import { Usuario } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  private usuario: Usuario = null;
  private url = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private navCtrl: NavController
    ) {
    this.initStorage();
  }

  login(email: string, password: string): Promise<boolean> {
    console.log(email, password);
    const data = {
      email,
      password
    };
    return new Promise((resolve, reject) => {
      this.http.post<LoginResponse>(`${this.url}/user/login`, data).subscribe(
        async (resp) => {
          console.log('OK', resp.ok);
          if (resp.ok) {
            console.log(resp.token);
            await this.guardarToken(resp.token);
            resolve(true);
          }
        },
        (err) => {
          console.log(err);
          this.token = null;
          this.storage.remove('token');
          reject(err);
        }
      );
    });
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.remove('token');
    this.navCtrl.navigateRoot('/login', {
      animated: true
    });
  }

  registro(usuario: Usuario) {
    return new Promise((resolve, reject) => {
      this.http
        .post<LoginResponse>(`${this.url}/user/create`, usuario)
        .subscribe(
          (resp) => {
            console.log('OK', resp.ok);
            if (resp.ok) {
              console.log(resp.token);
              this.guardarToken(resp.token);
              resolve(true);
            }
          },
          (err) => {
            // console.log(err);
            this.token = null;
            this.storage.remove('token');
            reject(err);
          }
        );
    });
  }

  actualizarUsuario(usuario: Usuario){
    // const headers = new HttpHeaders({
    //   'x-token': this.token
    // });
    return new Promise((resolve, reject) => {
      this.http.post<LoginResponse>(`${this.url}/user/update`, usuario).subscribe((resp) => {
        if (resp.ok) {
          this.guardarToken(resp.token);
          resolve(true);
        }
      },(err) => {
        this.token = null;
        this.storage.remove('token');
        reject(err);
      });
    });
  }

  async getUsuario() {
    // if (!this.usuario._id) {
    // }
    await this.validaToken();
    return {...this.usuario};
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  async validaToken(): Promise<boolean> {


    if (!await this.cargarToken()) {
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve, reject) => {
      // const headers = new HttpHeaders({
      //   'x-token': this.token
      // });
      this.http.get<ValidarTokenResponse>(`${this.url}/user/`).subscribe((resp) => {
        if (resp.ok) {
          this.usuario = resp.usuario;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  private async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  private async initStorage() {
    await this.storage.create();
  }

}
