import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Usuario } from '../interfaces/interfaces';
import { promise } from 'protractor';
import { resolve } from 'url';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { async } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  usuario: Usuario = {};

  constructor(private http: HttpClient, private storage: Storage, private nav: NavController, private fileTransfer: FileTransfer) { }

  login(email: string, password: string) {
    const data = {email, password};

    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data).subscribe(async resp => {
        if (resp['ok']) {
        await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
       });
    });
   }

   logout() {
     this.token = null;
     this.usuario = null;
     this.storage.clear();
     this.nav.navigateRoot('/login', {animated: true});
   }

   registro(usuario: Usuario) {
    return new Promise(resolve => {
      this.http.post(`${URL}/user/create`, usuario).subscribe(async resp => {
        console.log(resp);
        if (resp['ok']) {
        await  this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
   }

   getUsuario() {
     if (!this.usuario._id) {
        this.validaToken();
     }
     return {...this.usuario};
   }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarToken() {

    this.token = await this.storage.get('token') || null;
  }
  async validaToken(): Promise<boolean> {
    await this.cargarToken();

    if (!this.token) {
      this.nav.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
 
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${URL}/user/`, {headers}).subscribe(resp => {
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.nav.navigateRoot('/login');
            resolve(false);
          }
      });
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise<boolean>(resolve => {
      this.http.post(`${URL}/user/update`, usuario, {headers}).subscribe(resp => {
        console.log(resp);
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);
        }

      });
    });
  }
  subirImagenusr( img: string ) {

    const options: FileUploadOptions = {
      fileKey: 'image',
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${ URL }/posts/upload`, options ).then( data => {
     console.log(data);
     }).catch( err => {
       console.log('error en carga', err);
      });

  }


}
