import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuard implements  CanLoad {
  constructor(private usuarioService: UsuarioService, private navCtrl: NavController) {
  }

  canLoad(): Promise<boolean | UrlTree> {
    return this.usuarioService.validaToken().then((resp) => {
      if (resp === true) {
        return true;
      } else {
        this.navCtrl.navigateRoot('/login');
        return false;
      }
    });
  }
}
