import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class CtrlWebServiceService {

  base_path = 'http://50.63.163.241/WSCurso/';
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(public http: Http) {


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


  create(entity, ruta: string) {
    return this.http.post(this.base_path+ruta, JSON.stringify({ Entity: entity }), this.options)
    .toPromise().catch(() => { throw new Error('Ocurio un error en la petición'); });
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
