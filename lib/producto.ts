import { IProducto } from '@/types/Producto';
import { apiClient } from './apiClient';

export async function getProductos(cookies?: string): Promise<IProducto[] | undefined> {
    try {
        const response = await apiClient.get<IProducto[]>('/producto', undefined, cookies);
        return response;
    } catch (error) {
        console.error('Error fetching productos:', error);
        throw new Error('Error fetching productos');
    }
}

export async function createProducto(producto: IProducto): Promise<IProducto | undefined> {
    try {
        const response = await apiClient.post<IProducto>('/producto', producto);
        return response;
    } catch (error) {
        console.error('Error creating producto:', error);
        throw new Error('Error creating producto');
    }
}

export async function updateProducto(producto: IProducto): Promise<IProducto | undefined> {
    try {
        const response = await apiClient.put<IProducto>(`/producto/${producto._id}`, producto);
        return response;
    } catch (error) {
        console.error('Error updating producto:', error);
        throw new Error('Error updating producto');
    }
}

export async function deleteProducto(productoId: string): Promise<void> {
    try {
        await apiClient.delete<void>(`/producto/${productoId}`);
    } catch (error) {
        console.error('Error deleting producto:', error);
        throw new Error('Error deleting producto');
    }
}