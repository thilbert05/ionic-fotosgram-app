import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/post.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginSlider') slides: IonSlides;


  loginUser = {
    email: 'tomashilbert@hotmail.com',
    password: 'tester',
  };

  registerUser: Usuario = {
    nombre: 'Juan Perez',
    email: 'test@test.com',
    password: 'tester',
    avatar: 'av-1.png'
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    // console.log(fLogin.valid);
    if (fLogin.invalid) {
      return;
    }

    try {
      const valido = await this.usuarioService.login(
        fLogin.value.email.trim(),
        fLogin.value.password.trim()
      );
      if (valido) {
        //navidad a tabs
        this.navCtrl.navigateRoot('/main/tabs/tab1', {
          animated: true
        });
      }
    } catch (error) {
      console.log(error);
      this.uiService.alertaInformativa(error.error.message);
    }
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }

    try {
      const valido = await this.usuarioService.registro(this.registerUser);
      // console.log(valido);
      if (valido) {
        //navidad a tabs
        this.navCtrl.navigateRoot('/main/tabs/tab1', {
          animated: true
        });
      }

    } catch (error) {
      // console.log(error);
      this.uiService.alertaInformativa(error.error.message);
    }
  }

  avatarSeleccionado(img: string) {
    this.registerUser.avatar = img;
  }

  swipeRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  swipeLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}
