import { UsuarioService } from '../../services/usuario.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {
  @Output() avatarActualChange = new EventEmitter<string>();

  @Input() avatarActual: string;

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true,
    },
    {
      img: 'av-2.png',
      seleccionado: false,
    },
    {
      img: 'av-3.png',
      seleccionado: false,
    },
    {
      img: 'av-4.png',
      seleccionado: false,
    },
    {
      img: 'av-5.png',
      seleccionado: false,
    },
    {
      img: 'av-6.png',
      seleccionado: false,
    },
    {
      img: 'av-7.png',
      seleccionado: false,
    },
    {
      img: 'av-8.png',
      seleccionado: false,
    },
  ];

  avatarSlideOpts = {
    slidesPerView: 3.5,
  };

  constructor(private usuarioService: UsuarioService) {}


  async ngOnInit() {
    this.avatarActual = (await this.usuarioService.getUsuario()).avatar;
    this.avatars.forEach(avatar => avatar.seleccionado = false);
    for (const avatar of this.avatars) {
      if (avatar.img === this.avatarActual) {
        avatar.seleccionado = true;
        break;
      }
    }
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach((av) => {
      av.seleccionado = false;
    });
    avatar.seleccionado = true;
    this.avatarActual = avatar.img;
    this.avatarActualChange.emit(this.avatarActual);
  }



}
