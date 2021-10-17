import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../interfaces/post.interface';

import { PostsService } from '../../services/posts.service';
import { UiService } from '../../services/ui-service.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare const window: any;

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
    private geoLocation: Geolocation,
    private camera: Camera
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

  getPhoto() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then((imageData) => {
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img);
      this.tempImages.push(img);
    }).catch((err) => {
      console.log(err);
    });
  }
}
