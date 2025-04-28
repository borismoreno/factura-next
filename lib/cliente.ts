import { ICliente } from '@/types/Cliente';
import { apiClient } from './apiClient';

export async function getClientes(cookies?: string): Promise<ICliente[] | undefined> {
    try {
        const response = await apiClient.get<ICliente[]>('/cliente', undefined, cookies);
        return response;
    } catch (error) {
        console.error('Error fetching clientes:', error);
        throw new Error('Error fetching clientes');
    }
}

export async function createCliente(cliente: ICliente): Promise<ICliente | undefined> {
    try {
        const response = await apiClient.post<ICliente>('/cliente', cliente);
        return response;
    } catch (error) {
        console.error('Error creating cliente:', error);
        throw new Error('Error creating cliente');
    }
}

export async function updateCliente(cliente: ICliente): Promise<ICliente | undefined> {
    try {
        const response = await apiClient.put<ICliente>(`/cliente/${cliente._id}`, cliente);
        return response;
    } catch (error) {
        console.error('Error updating cliente:', error);
        throw new Error('Error updating cliente');
    }
}

export async function deleteCliente(clienteId: string): Promise<void> {
    try {
        await apiClient.delete<void>(`/cliente/${clienteId}`);
    } catch (error) {
        console.error('Error deleting cliente:', error);
        throw new Error('Error deleting cliente');
    }
}