export interface IFormMainModule <T>{

    action(entity: T );
    showActionPane(module: string, segUsuario: any);
    showRows();
    
    
}