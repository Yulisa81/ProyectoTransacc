import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Persona } from 'src/app/Shared/Persona';


@Component({
  selector: 'app-frm-persona',
  templateUrl: './frm-persona.page.html',
  styleUrls: ['./frm-persona.page.scss'],
})
///@ViewChild('slidingList') slidingList: List;
 
export class FrmPersonaPage implements OnInit {
  slidingList: any;
  persona : any;

  constructor() {
    this.persona = ['alicia'];
   }

  ngOnInit() {
  }
  share(persona: IonItemSliding) {
    persona.close();
  }
}
