import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

  loginUser = {
    email: 'Maarco.pq@gmail.com',
    password: 'ferrari22'
  };


  registroUser: Usuario = {
    email: 'test',
    password: 'ferrari22',
    nombre: 'Test',
  };

  constructor(private usuarioService: UsuarioService, private nav: NavController, private UIservice: UiServiceService ) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
     if (fLogin.invalid) {return; }
     const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
     if (valido) {
       // navegartabs
      this.nav.navigateRoot('/main/tabs/tab1', {animated: true});
      } else {
        this.UIservice.presentAlert('Usuario o contraseña incorrecto.');
      }

   }

 async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {return; }
    const valido = await this.usuarioService.registro(this.registroUser);
    if (valido) {
      // navegartabs
     this.nav.navigateRoot('/main/tabs/tab1', {animated: true});
     } else {
       this.UIservice.presentAlert('El correo electronico ya fue registrado.');
     }

  }

  mostrarRegistro() {
      this.slides.lockSwipes(false);
      this.slides.slideTo(0);
      this.slides.lockSwipes(true);
  }

  mostrarLogin() {
      this.slides.lockSwipes(false);
      this.slides.slideTo(1);
      this.slides.lockSwipes(true);

  }

}
