// lib/apiClient.ts
import { logoutUser } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Tipos ---
interface ApiClientOptions extends RequestInit {
    body?: any; // Permitimos cualquier tipo para el body antes de serializar
}

// --- Clase o Funciones del Cliente API ---

/**
 * Realiza una solicitud a la API externa.
 * Maneja la serialización del cuerpo, la adición de encabezados comunes
 * y el token de autenticación.
 * @param endpoint La ruta específica de la API (ej: '/auth/login').
 * @param options Opciones de Fetch API (method, headers, body, etc.).
 * @returns Promise<T> La respuesta parseada de la API.
 * @throws {Error} Si la respuesta no es exitosa (status code >= 400).
 */
async function request<T>(endpoint: string, options: ApiClientOptions = {}, cookies?: string): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Accept': 'application/json',
    };

    // Añadir Content-Type si hay body y no es FormData
    if (options.body && !(options.body instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
        // Serializar el body si no es FormData
        options.body = JSON.stringify(options.body);
    }
    // Fusionar headers por defecto con los proporcionados en options
    options.headers = {
        ...defaultHeaders,
        ...options.headers,
    };

    if (cookies) {
        // Añadir cookies a los headers si se proporcionan
        (options.headers as Record<string, string>)['Cookie'] = cookies;
    }

    options.credentials = 'include'; // Incluir cookies en la solicitud

    try {
        const response = await fetch(url, options as RequestInit); // Castear a RequestInit después de modificar

        // Si la respuesta no es OK (status >= 400), intentar parsear el error
        if (!response.ok) {
            let errorData;
            try {
                // Intenta parsear el cuerpo del error como JSON
                errorData = await response.json();
            } catch (e) {
                // Si el cuerpo no es JSON o hay otro error al parsear
                errorData = { message: `HTTP error ${response.status}: ${response.statusText}` };
            }


            if (response.status === 401) {
                // Si el error es 401 Unauthorized, intenta hacer logout
                await logoutUser();
            }
            // Lanza un error con el mensaje de la API o un mensaje genérico
            throw new Error(errorData?.message || `Request failed with status ${response.status}`);
        }

        // Si la respuesta es 204 No Content, no hay cuerpo para parsear
        if (response.status === 204) {
            // Devolvemos null o un objeto vacío tipado como T según necesites.
            // Aquí devolvemos null, asegúrate que el tipo T lo permita donde lo uses.
            return null as T;
        }

        // Parsear la respuesta como JSON
        const data: T = await response.json();
        return data;

    } catch (error) {
        console.error('API Client Error:', error);
        // Re-lanzar el error para que sea manejado por la función llamante
        // Asegurarse que siempre sea una instancia de Error
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('An unknown error occurred in the API client.');
        }
    }
}

// Exportar funciones específicas para métodos HTTP comunes
export const apiClient = {
    get: <T>(endpoint: string, options?: Omit<ApiClientOptions, 'body' | 'method'>, cookies?: string) =>
        request<T>(endpoint, { ...options, method: 'GET' }, cookies),

    post: <T>(endpoint: string, body?: any, options?: Omit<ApiClientOptions, 'body' | 'method'>, cookies?: string) =>
        request<T>(endpoint, { ...options, method: 'POST', body }, cookies),

    put: <T>(endpoint: string, body?: any, options?: Omit<ApiClientOptions, 'body' | 'method'>) =>
        request<T>(endpoint, { ...options, method: 'PUT', body }),

    delete: <T>(endpoint: string, options?: Omit<ApiClientOptions, 'body' | 'method'>) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),

    patch: <T>(endpoint: string, body?: any, options?: Omit<ApiClientOptions, 'body' | 'method'>) =>
        request<T>(endpoint, { ...options, method: 'PATCH', body }),
};

export default apiClient;