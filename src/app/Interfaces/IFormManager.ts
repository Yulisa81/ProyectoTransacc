export interface IFormManager <T> {

    ///Tipo Usuario
    user : any;
    baseEntity : T;
    actionType: string;

    loadInformation(entity : T);

    setEntity();

    getEntity();

    //Retun Boolean
    validateForm() : boolean ;


}