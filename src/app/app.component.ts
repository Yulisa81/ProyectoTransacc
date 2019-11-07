import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SegUsuario } from './Shared/Entity/SegUsuario';
import { Comun } from 'src/Contol/Comun';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public user = new SegUsuario();
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
      {
      title: 'Persona',
      url: 'frm-persona-principal',
      icon: 'person'
    },
    {
      title: 'Transacciones',
      url: 'frm-transacciones',
      icon: 'logo-usd'
    },
    {
      title: 'About',
      url: 'frm-about',
      icon: 'information-circle'
    },
    {
      title: 'Logout',
      url: 'frm-login',
      icon: 'arrow-round-forward'
    }
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private comun: Comun
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
      this.user = this.comun.globalVariable.usuario;
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
