import { Injectable } from '@angular/core';
import { SegUsuario } from './Shared/Entity/SegUsuario';
import { Persona } from './Shared/Entity/Persona';

@Injectable({
    providedIn: 'root'
})

export class GlobalVariable {

    // Usuario en seccion
    public usuario: SegUsuario;
    // Permisos que tiene el usuario
    public permisos: any = [];

}
