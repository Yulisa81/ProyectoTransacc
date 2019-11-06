import { Injectable } from '@angular/core';
import { CtrlValidator } from './CtrlValidator';
import { CtrlGenericInstance } from './CtrlGenericInstance';
import { GlobalVariable } from '../app/app.global';

@Injectable({
    providedIn: 'root'
})
export class Comun {

    constructor(public ctrlValidate: CtrlValidator, public ctrGeneric: CtrlGenericInstance,
                public globalVariable: GlobalVariable) {
    }
}
