// lib/actions/auth.actions.ts
'use server'; // ¡Fundamental! Marca todo el módulo como contenedor de Server Actions.

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// Opcional: Importa lógica específica de backend si necesitas invalidar el token allí
// import { invalidateTokenOnBackend } from '../auth';

const AUTH_COOKIE_NAME = 'access-token';

export async function getTokenAction() {
    const cookieStore = cookies();
    const token = (await cookieStore).get(AUTH_COOKIE_NAME);
    return token?.value;
}

export async function logoutAction() {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get(AUTH_COOKIE_NAME);
        if (token) {
            // Elimina la cookie del token
            (await cookieStore).delete(AUTH_COOKIE_NAME);
        }
    } catch (error) {
        console.error('Error en removeCookie:', error);
    }

    // 4. Redirigir al usuario a la página de login
    // ¡Importante! redirect() debe llamarse fuera de bloques try...catch
    // porque internamente lanza un error especial que Next.js maneja.
    redirect('/login');
}