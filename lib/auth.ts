// lib/auth.ts
// import { logoutAction } from './actions/auth.actions';
import { apiClient } from './apiClient';
import { setToken, removeToken } from './tokenStorage';

// --- Tipos ---

// Interfaz para el objeto User (ajusta según tu API)
export interface User {
    _id: string;
    rol: string;
    estado: boolean;
    nombre: string;
    email: string;
    empresa: string;
    pagoRegistrado: boolean;
    // ... otros campos que devuelva tu API sobre el usuario
}

// Interfaz esperada de la respuesta del endpoint de login
// (ajusta EXACTAMENTE a lo que devuelve tu API)
interface LoginResponse {
    message?: string; // Mensaje de error opcional
    user: User;
    token: string; // Asume que la API devuelve el token aquí
    // refreshToken?: string; // Si usas refresh tokens
}

// Interfaz para los datos enviados al endpoint de login
export interface LoginCredentials {
    email: string;
    password: string;
}

// Interfaz para los datos enviados al endpoint de registro (ejemplo)
interface RegisterData extends LoginCredentials {
    name?: string;
    // ...otros campos de registro
}

// --- Funciones de Autenticación ---

/**
 * Envía las credenciales al endpoint de login de la API.
 * Si es exitoso, guarda el token y devuelve los datos del usuario.
 * @param credentials Email y contraseña.
 * @returns Promise<User> Los datos del usuario logueado.
 */
export async function loginUser(credentials: LoginCredentials): Promise<User> {
    try {
        // Ajusta el endpoint '/auth/login' al de tu API real
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

        if (response.token && response.user) {
            setToken(response.token); // Guarda el token recibido
            return response.user;
        } else {
            if (response.message) {
                // Si la API devuelve un mensaje de error específico
                throw new Error(response.message);
            }
            // Si la API devuelve 2xx pero no el token/user esperado
            throw new Error('Respuesta inválida del servidor durante el login.');
        }
    } catch (error) {
        console.error('Error en loginUser:', error);
        // Re-lanza el error para que el AuthContext lo maneje
        throw error;
    }
}

/**
 * Llama al endpoint de logout de la API (si existe) y elimina el token local.
 */
export async function logoutUser(): Promise<void> {
    try {

        // Llama a tu endpoint de logout si tu API lo requiere (opcional)
        // Ejemplo: await apiClient.post('/auth/logout');
        // Lo más importante es eliminar el token localmente
        await apiClient.post('/auth/logout');
        // removeToken();
        // logoutAction();
        // removeCookie();
    } catch (error) {
        console.error('Error en logoutUser:', error);
        // Aún si falla la llamada a la API, debemos limpiar el token local
        // removeToken();
        // logoutAction();
        // removeCookie();
        // Opcionalmente, puedes decidir si re-lanzar el error o no
        // throw error;
    }
}

/**
 * Llama a un endpoint protegido para obtener los datos del usuario actual
 * basado en el token almacenado.
 * @returns Promise<User | null> Datos del usuario si está autenticado, null si no.
 */
export async function getCurrentUser(): Promise<User | null> {
    try {
        // Llama a un endpoint como '/auth/me' o '/users/me' que devuelva
        // los datos del usuario basado en el token 'Authorization'.
        // Ajusta el endpoint a tu API.
        const response = await apiClient.get<LoginResponse>('/auth/me');
        if (response.token && response.user) {
            // setToken(response.token); // Guarda el token recibido
            return response.user;
        } else {
            // Si la API devuelve 2xx pero no el token/user esperado
            throw new Error('Respuesta inválida del servidor durante el login.');
        }
    } catch (error: any) {
        // Si el error es 401 Unauthorized (o similar), significa que no hay sesión válida.
        // Necesitarías verificar el status code si apiClient no lo hace explícito.
        // Por ahora, asumimos que cualquier error aquí significa no autenticado.
        // Puedes refinar esto verificando error.message o status code si es necesario.
        console.warn('No se pudo obtener el usuario actual (puede que no esté logueado):', error.message);
        // removeToken(); // Limpiar token inválido si lo hubiera
        // logoutAction();
        // removeCookie(); // Limpiar cookie inválida si lo hubiera
        return null;
    }
}

/**
 * Envía los datos de registro al endpoint correspondiente de la API.
 * @param data Datos del nuevo usuario (nombre, email, password, etc.).
 * @returns Promise<User> Los datos del usuario recién creado (ajusta según tu API).
 */
export async function registerUser(data: RegisterData): Promise<User> {
    try {
        // Ajusta el endpoint '/auth/register' al de tu API real
        // Asume que la API devuelve el usuario creado tras el registro exitoso
        const newUser = await apiClient.post<User>('/auth/register', data);
        // Nota: El registro podría no devolver un token automáticamente.
        // El usuario podría necesitar hacer login después o verificar email.
        return newUser;
    } catch (error) {
        console.error('Error en registerUser:', error);
        throw error; // Re-lanza para manejo en el componente de registro
    }
}

// --- Puedes añadir más funciones según necesites ---
// ej: requestPasswordReset(email), resetPassword(token, newPassword), etc.