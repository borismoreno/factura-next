export interface ICliente {
    _id?: string;
    activo: boolean;
    razonSocial: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    telefono: string;
    mail: string;
    direccion: string;
}