import { AccionForm } from '../Enum/enumContoles';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Promise, resolve,reject } from 'q';

@Injectable({
    providedIn: 'root'
})

export class FormManagerExtender {

    public initializeComponent<T>(form: any, BaseEntity: T) {
        try {
            if (isNullOrUndefined(BaseEntity)) {
                form.AccionForm = AccionForm.AGREGAR;
                form.actionType = AccionForm.AGREGAR.toString();
            } else {
                form.AccionForm = AccionForm.EDITAR;
                form.actionType = AccionForm.EDITAR.toString();
                form.BaseEntity = BaseEntity;
            }
            form.loadInformation();
            form.setEntity();
            form.getEntity();
        } catch (error) {
            throw new Error('Error en la inicializacion de los componentes.');
        }
    }

}