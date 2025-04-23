// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Nombres de las cookies y páginas de login
const AUTH_COOKIE_NAME = 'access-token';
const LOGIN_PATH = '/login';

// Lista de rutas que requieren autenticación
// Puedes usar patrones más complejos si es necesario
const PROTECTED_PATHS = ['/', '/clients', '/products']; // Incluye la raíz del dashboard

export function middleware(request: NextRequest) {
    // 1. Obtener la cookie de autenticación de la petición entrante
    const tokenCookie = request.cookies.get(AUTH_COOKIE_NAME);
    const token = tokenCookie?.value;


    // 2. Obtener la ruta solicitada
    const { pathname } = request.nextUrl;

    // 3. Comprobar si la ruta solicitada es una ruta protegida
    const isProtectedRoute = PROTECTED_PATHS.some(path => pathname === path || (path !== '/' && pathname.startsWith(path + '/')));

    // 4. Lógica de Redirección
    // Redirigir a /login si:
    // - Se está intentando acceder a una ruta protegida Y
    // - No existe el token
    if (isProtectedRoute && !token) {
        console.log(`[Middleware] No token found for protected route: ${pathname}. Redirecting to login.`);
        // Guarda la URL a la que se intentaba acceder para redirigir después del login (opcional)
        const redirectUrl = new URL(LOGIN_PATH, request.url);
        redirectUrl.searchParams.set('redirectedFrom', pathname); // Añade query param
        return NextResponse.redirect(redirectUrl);
    }

    // 5. Lógica Adicional (Opcional pero Recomendado)
    // Redirigir al dashboard si:
    // - El usuario YA está autenticado (tiene token) Y
    // - Intenta acceder a las páginas de /login, /register, etc.
    if (token && (pathname === LOGIN_PATH || pathname === '/register' || pathname === '/reset-password')) {
        console.log(`[Middleware] Authenticated user trying to access ${pathname}. Redirecting to dashboard root.`);
        return NextResponse.redirect(new URL('/', request.url)); // Redirige a la raíz del dashboard
    }

    // --- Validación de Token (Opcional Avanzado) ---
    // Aquí podrías añadir una lógica para verificar si el token es válido
    // (ej: decodificándolo o haciendo una llamada rápida a un endpoint de /verify-token).
    // ¡Cuidado! Esto añade latencia a CADA petición protegida.
    // if (isProtectedRoute && token) {
    //   const isValid = await verifyTokenSomehow(token); // Implementa esta función
    //   if (!isValid) {
    //     console.log(`[Middleware] Invalid token for protected route: ${pathname}. Redirecting to login.`);
    //     const redirectUrl = new URL(LOGIN_PATH, request.url);
    //     // Podrías intentar limpiar la cookie aquí, aunque es más complejo en middleware
    //     // response.cookies.delete(AUTH_COOKIE_NAME); <= No se puede hacer directamente aquí en redirect
    //     return NextResponse.redirect(redirectUrl);
    //   }
    // }
    // --- Fin Validación Opcional ---


    // 6. Si ninguna condición de redirección se cumple, permite que la petición continúe
    // console.log(`[Middleware] Allowed access to: ${pathname}`);
    return NextResponse.next();
}

// 7. Configuración del Matcher
// Especifica en qué rutas se ejecutará este middleware.
// Es crucial para el rendimiento no ejecutarlo en assets estáticos (_next/), etc.
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /images/ (o cualquier otra carpeta pública que tengas)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};