import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alert: AlertController, private toastController: ToastController) { }

  async presentAlert(message: string) {
    const alert = await this.alert.create({
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message,
      duration: 1500
    });
    toast.present();
  }
}
