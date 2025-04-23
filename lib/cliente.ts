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

export async function getClientes(): Promise<Cliente[] | undefined> {
    try {
        const response = await apiClient.get<Cliente[]>('/cliente');
        return response;
    } catch (error) {
        // if (error instanceof Error) {
        //     if (error.message.includes('Unauthorized')) {
        //         await logoutUser();
        //         return Promise.reject(new Error('Unauthorized. Please log in again.'));
        //     }
        // } else {
        //     throw new Error('An unknown error occurred in the API client.');
        // }
        console.error('Error fetching clientes:', error);
        throw new Error('Error fetching clientes');
    }
}