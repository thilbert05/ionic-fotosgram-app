import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../interfaces/post.interface';

import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private uiService: UiService, private postService: PostsService) {}


  async ngOnInit() {
  }

  async ionViewWillEnter() {
    this.usuario = await this.usuarioService.getUsuario();
    console.log(this.usuario);
  }


  logout() {
    this.postService.paginaPost = 0;
    this.usuarioService.logout();
  }



  async actualizarUsuario(fActualizar: NgForm) {
    if (fActualizar.invalid) {
      return;
    }

    try {
      const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);

      if (actualizado) {
        this.uiService.presentToast('Usuario actualizado');
      }
    } catch (err) {
      this.uiService.alertaInformativa(err.message);
    }

  }

  // async ionViewDidLeave() {
  //   this.usuario = await this.usuarioService.getUsuario();
  // }


}
