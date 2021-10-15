import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private usuarioService: UsuarioService) {}

 intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'x-token': token
    });
    const modReq = req.clone({
      headers
    });
    return next.handle(modReq);
  }

  private getToken() {
    this.usuarioService.cargarToken();
    const token = this.usuarioService.token;
    return token;
  }
}
