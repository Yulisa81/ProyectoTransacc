import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';
import { Controles } from 'src/app/Shared/Enum/enumContoles';

@Injectable({
  providedIn: 'root'
})
export class CtrlGenericInstance {

  public mensaje: string;
  private loading: any;
  constructor(private alertController: AlertController,
    private loadingController: LoadingController,
    private toastCtrl: ToastController) { }

  /**
   * LLena el select con la lista de elementos
   */
  public setLoadComboBox(cmbLoad: HTMLElement, lista: any[]) {

    if (!isUndefined(cmbLoad)) {
      if (cmbLoad.tagName === Controles.ION_SELECT) {
        if (!isUndefined(lista)) {
          let listaNueva = lista.map((c, i) => `<ion-select-option value="${i}">${c.note}</ion-select-option>`).join('');
          // for (let i = 0; i < lista.length; i++) {
          //   element += `<ion-select-option value="${i}">${lista[i].title}</ion-select-option>`;
          // }
          cmbLoad.innerHTML = listaNueva;
        }
      }
    }
  }

  /**
   * Muestra el mensaje
   */
  public async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  /**
   * Muestra Toast
   */
  public async showMessage(data: string) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 3000
    });

    await toast.present();
  }

  /**
   * Muestra un cargado en pantalla
   */
  public async mostrarCargando() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  /**
   * Oculta el cargado de la pantalla
   */
  public cerrarCargado() {
    if (!isNullOrUndefined(this.loading)) {
      this.loading.dismiss();
    }
  }

  public mostrarError(error) {
    switch (error.constructor) {
      case Error:
        this.cerrarCargado();
        this.alertaInformativa(error.message);
        console.log('generic');
        break;
      case RangeError:
        console.log('range');
        break;
      default:
        console.log('unknown');
        break;
    }
  }

}
