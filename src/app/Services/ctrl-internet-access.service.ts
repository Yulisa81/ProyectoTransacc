import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtrlInternetAccessService {
  private dispositivoDate;
  private serverDate;
  private serverH;
  private DispositivoH;

  constructor() { }

  checkTime(dateDay: string): boolean {
    var date = new Date(dateDay);
    var date2 = new Date(date);
    ///Primera hora y minutos
    console.log("Fecha1" + date);
    var minutes: any = date.getMinutes()
    date.getUTCMinutes
    var hours: any = date.getHours()
    ///Fecha 1
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var fechaCompuesta1 = month + '-' + day + '-' + year;
    this.serverDate = fechaCompuesta1;
    var month2 = date2.getMonth() + 1;
    var day2 = date2.getDate();
    var year2 = date2.getFullYear();
    var fechaCompuesta2 = month2 + '-' + day2 + '-' + year2;
    ///Segunda hora y minutos
    var minutes2: any = date2.getMinutes();
    var hours2: any = date2.getUTCHours();
    let restanteTiempo = minutes - minutes2;
    this.dispositivoDate = fechaCompuesta2;
    console.log("Minutos2:" + minutes2);
    console.log("horas2" + hours2);
    ///Formato hora y minutos 
    if (minutes <= 9) { minutes = "0" + minutes }
    if (hours <= 9) { hours = "0" + hours }
    ///Formato hora y minutos 2
    if (minutes2 <= 9) { minutes2 = "0" + minutes2 }
    if (hours2 <= 9) { hours2 = "0" + hours2 }
    this.DispositivoH = hours2 + ":" + minutes2;
    this.serverH = hours + ":" + minutes;
    
    console.log("Nuestra Resta obtuvo el valor de :" + "" + restanteTiempo);
    if (hours == hours2 && restanteTiempo >= 0 && restanteTiempo <= 5) {
      if (fechaCompuesta1 == fechaCompuesta2) {
        console.log("es verdadero");
        return true;
      }
    } else {
      console.log("es falso");
      return false;
    }
  }

  checkInternetConnection(): boolean {
  //   this.platform.ready().then(() => {
  //     var networkState = navigator.connection.type;
  //     var states = {};
  //     states[Connection.UNKNOWN]  = 'Unknown connection';
  //     states[Connection.WIFI]     = 'WiFi connection';
  //     states[Connection.CELL_2G]  = 'Cell 2G connection';
  //     states[Connection.CELL_3G]  = 'Cell 3G connection';
  //     states[Connection.CELL_4G]  = 'Cell 4G connection';
  //     states[Connection.CELL]     = 'Cell generic connection';
  //     states[Connection.NONE]     = 'No network connection';
  //     let isErrorConexion= networkState
  //     let isVarErrorCompare="none"      
  //  if(isErrorConexion==isVarErrorCompare){
  //   let alert = this.showMessage("Error verifique su conexión a internet..."); 
  //   return false
  //  }else{
  //     return true
  //  }
       
  // });
      return true;
  }

}