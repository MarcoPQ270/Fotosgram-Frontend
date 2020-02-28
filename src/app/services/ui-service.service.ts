import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alert: AlertController) { }

  async presentAlert(message: string) {
    const alert = await this.alert.create({
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
