export interface IFormMain {

    ///Tipo SegUsuario
    user: any;

    ///Tipo Permiso
    loadMenu(permisos : any);

    ///Return Bool
    logout();

    userInformation(usuario : any);

    ///Return void
    OpenPage(permiso: any, module : any);

    

}