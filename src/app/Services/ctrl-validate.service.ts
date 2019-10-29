import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CtrlValidateService {
  constructor() { }

  validateInput(input: any): boolean {
    return true;
  }


}
