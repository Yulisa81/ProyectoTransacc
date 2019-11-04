import { Component, OnInit } from '@angular/core';
import { CtrlWebServiceService } from 'src/app/Services/ctrl-web-service.service';
import { Transaccion } from 'src/app/Shared/Transaccion';

@Component({
  selector: 'app-frm-transacciones',
  templateUrl: './frm-transacciones.page.html',
  styleUrls: ['./frm-transacciones.page.scss'],
})
export class FrmTransaccionesPage implements OnInit {
transaccion : Transaccion;
  constructor(private ctrlWebServiceService : CtrlWebServiceService ) { }

  ngOnInit() {
    ////this.ctrlWebServiceService.getAll(transaccion);
  }

}
