import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPost = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private usuarioser: UsuarioService, private fileTransfer: FileTransfer) { }

    getPosts(pull: boolean = false) {
      if (pull) {
        this.paginaPost = 0;
      }
      this.paginaPost++;
      return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPost}`);
    }

    crearPost(post) {
      const headers = new HttpHeaders({
        'x-token': this.usuarioser.token
      });
      return new Promise(resolve => {
        this.http.post(`${URL}/posts`,  post, {headers}).subscribe(resp => {
          this.nuevoPost.emit(resp['post']);
          resolve(true);
      });
      });

    }
     subirImagen( img: string ) {

       const options: FileUploadOptions = {
        fileKey: 'image',
        headers: {
           'x-token': this.usuarioser.token
        }
      };

       const fileTransfer: FileTransferObject = this.fileTransfer.create();

       fileTransfer.upload( img, `${ URL }/posts/upload`, options ).then( data => {
        console.log(data);
        }).catch( err => {
          console.log('error en carga', err);
         });

     }

}
