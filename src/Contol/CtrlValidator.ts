import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CtrlValidator {

    constructor() { }

    /**
     * Field requerido
     */
    public Required() {
        return Validators.compose([Validators.required]);
    }

    /**
     * Longitud maxima de 50 y es requerido
     */
    public MaxLengthRequired() {
        return Validators.compose([Validators.maxLength(50), this.Required()]);
    }

    /**
     * Longitud maxima de 10 y es requerido
     */
    public MaxDiezLengthRequired() {
        return Validators.compose([Validators.maxLength(10), this.Required()]);
    }

    /**
     * Solo permite letras, una longitud de 50 y es requerido
     */
    public OnlyLettersRequired() {
        return Validators.compose([Validators.pattern('[a-zA-Z ]*'), this.MaxLengthRequired()]);
    }

    /**
     * Solo permite numeros, una longitud de 10 y es requerido
     */
    public OnlyNumersRequired() {
        return Validators.compose([Validators.pattern('[0-9]*'), this.MaxDiezLengthRequired()]);
    }

    /**
     * Formato de email y es requerido
     */
    public EmailRequired() {
        return Validators.compose([Validators.email, this.MaxLengthRequired()]);
    }

    ///// No Requeridos

    /**
     * Longitud maxima de 50
     */
    public MaxLength() {
        return Validators.compose([Validators.maxLength(50)]);
    }

    /**
     * Longitud maxima de 10
     */
    public MaxDiezLength() {
        return Validators.compose([Validators.maxLength(10)]);
    }

    /**
     * Solo permite letras, una longitud de 50
     */
    public OnlyLetters() {
        return Validators.compose([Validators.pattern('[a-zA-Z ]*'), this.MaxLength()]);
    }

    /**
     * Solo permite numeros, una longitud de 10
     */
    public OnlyNumers() {
        return Validators.compose([Validators.pattern('[0-9]*'), this.MaxDiezLength()]);
    }

    /**
     * Formato de email
     */
    public Email() {
        return Validators.compose([Validators.email, this.MaxLength()]);
    }
}
