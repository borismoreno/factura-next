// lib/tokenStorage.ts

// Clave para guardar el token en localStorage
const TOKEN_KEY = 'authToken';

/**
 * Guarda el token de autenticación en localStorage.
 * @param token El token a guardar.
 */
export function setToken(token: string): void {
    if (typeof window !== 'undefined') { // Asegurarse que se ejecuta en el cliente
        localStorage.setItem(TOKEN_KEY, token);
    }
}

/**
 * Obtiene el token de autenticación desde localStorage.
 * @returns El token guardado o null si no existe.
 */
export function getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null; // No hay localStorage en el servidor
}

/**
 * Elimina el token de autenticación de localStorage.
 */
export function removeToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
    }
}