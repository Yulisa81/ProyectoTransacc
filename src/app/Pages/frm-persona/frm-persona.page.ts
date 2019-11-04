import { Component, OnInit } from '@angular/core';
import { IonItemSliding, AlertController } from '@ionic/angular';
import { Persona } from 'src/app/Shared/Persona';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';


@Component({
  selector: 'app-frm-persona',
  templateUrl: './frm-persona.page.html',
  styleUrls: ['./frm-persona.page.scss'],
})
///@ViewChild('slidingList') slidingList: List;
 
export class FrmPersonaPage implements OnInit {
  slidingList: any;
  persona : any;
  //persona :Persona;

  constructor(private alertCtrl : AlertController,private alertController :AlertController, private ctrlWebServiceService :CtrlWebServiceService ) {
    this.persona = ['alicia'];
   }

  ngOnInit() {
    
  }

  share(persona: IonItemSliding) {
    persona.close();
  }

  getAll(persona) {
    this.ctrlWebServiceService.getAll(persona);
  }
 
}