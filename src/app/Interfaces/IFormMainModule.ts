export interface IFormMainModule<T> {

    action(entity: T): void;
    showActionPane(module: string, segUsuario: any): void;
    showRows(): void;

}