import { Component, OnInit, Output, Input,EventEmitter } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarActual = 'av-1.png';
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5
 };
  private usuario: Usuario = {};

  constructor(private postserv: PostsService, private usuarioserv: UsuarioService, private uiservice: UiServiceService) {}

  ngOnInit() {
  this.usuario = this.usuarioserv.getUsuario();
  console.log(this.usuario);
  }

 async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) {return; }
    const actualizado = await this.usuarioserv.actualizarUsuario(this.usuario);
    console.log(actualizado);
    if (actualizado) {
      this.uiservice.presentToast('Usuario actualizado');
    } else {
      this.uiservice.presentToast('Error al actualizar');
    }
  }

  logout() {
    this.postserv.paginaPost = 0;
    this.usuarioserv.logout();
  }

}
