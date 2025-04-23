import { apiClient } from './apiClient';
export interface Cliente {
    _id: string;
    activo: boolean;
    razonSocial: string;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    telefono: string;
    mail: string;
    direccion: string;
}

export async function getClientes(): Promise<Cliente[]> {
    try {
        const response = await apiClient.get<Cliente[]>('/cliente');
        return response;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        throw new Error('Error fetching clientes');
    }
}