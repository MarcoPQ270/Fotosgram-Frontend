import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  private usuario: Usuario = {};

  constructor(private usuarioserv: UsuarioService, private uiservice: UiServiceService) {}

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

  }

}
