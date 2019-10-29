import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-frm-persona',
  templateUrl: './frm-persona.page.html',
  styleUrls: ['./frm-persona.page.scss'],
})
///@ViewChild('slidingList') slidingList: List;
 
export class FrmPersonaPage implements OnInit {
  slidingList: any;

  constructor() { }

  ngOnInit() {
  }
  
  async delete() {
    // something
    await this.slidingList.closeSlidingItems();
  }
}
