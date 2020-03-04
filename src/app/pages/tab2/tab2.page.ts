import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string [] = [];
  CargandoGeo = false;

  constructor(private postSer: PostsService, private route: Router, private geolocation: Geolocation, private camera: Camera) {}

post = {
  mensaje: '',
  coords: null,
  posicion: false
};

  async crearPost() {
    console.log(this.post);
    const creado = await this.postSer.crearPost(this.post);
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };
    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {

    if (!this.post.posicion) {
        this.post.coords = null;
        return;
    }
    this.CargandoGeo = true;
    console.log(this.post);

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.CargandoGeo = false;

      const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.CargandoGeo = false;
     });
  }
  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.porcesarimg(options);
  }

  libreria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.porcesarimg(options);

  }

  porcesarimg(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
     const img = window.ionic.WebView.convertFileSrc(imageData);
     console.log(img);
     this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }
}
