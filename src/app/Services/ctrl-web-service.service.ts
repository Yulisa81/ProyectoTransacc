import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Persona } from '../Shared/Persona';


@Injectable({
  providedIn: 'root'
})
export class CtrlWebServiceService {

  base_path = 'http://50.63.163.241/WSCurso/api/Login';
  constructor(public http: HttpClient) {


  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  create(entity, ruta: string): Observable<Persona> {
      return this.http
      .post<Persona>(this.base_path, JSON.stringify(entity), this.httpOptions)
    console.log(this.base_path);
  }

  update(entity: any, ruta: string): any {

  }

  delete(entity: any, ruta: string): any {

  }

  getById(entity: any, ruta: string) {
      return this.http
        .get(this.base_path + '/' + 2).toPromise();
  }
  getAll(ruta: string): any {

  }
}
