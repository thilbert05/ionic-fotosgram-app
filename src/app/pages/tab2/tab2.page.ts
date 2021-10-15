import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../interfaces/post.interface';

import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui-service.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];
  cargandoGeo = false;

  post: Post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(
    private postsService: PostsService,
    private router: Router,
    private uiService: UiService,
    private geoLocation: Geolocation
  ) {}

  async crearPost() {
    try {
      const creado = await this.postsService.crearPost(this.post);
      this.post = {};
      this.router.navigateByUrl('/main/tabs/tab1');
    } catch (err) {
      this.uiService.alertaInformativa(err.error.message);
    }
  }

  async getGeo() {
    if (!this.post.posicion) {
      this.post.coords = null;
    }
    this.cargandoGeo = true;
    try {
      const {coords} = await this.geoLocation.getCurrentPosition();
      this.cargandoGeo = false;
      this.post.coords = `${coords.latitude}, ${coords.longitude}`;
      console.log(this.post);
    } catch (error) {
      console.log('Error getting location', error);
    }
  }
}
