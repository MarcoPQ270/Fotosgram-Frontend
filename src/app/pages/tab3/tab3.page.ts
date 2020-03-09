import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


declare var window: any;
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  tempImages: string [] = [];
  private usuario: Usuario = {};

  constructor(private postserv: PostsService, private usuarioserv: UsuarioService, private uiservice: UiServiceService, private camera: Camera) {}

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

  libreria() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );

  }

  procesarImagen( options: CameraOptions ) {

    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

       const img = window.Ionic.WebView.convertFileSrc( imageData );

       this.usuarioserv.subirImagenusr( imageData );
       this.tempImages.push( img );

     }, (err) => {
      // Handle error
     });
  }

}
