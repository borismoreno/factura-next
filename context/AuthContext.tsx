// context/AuthContext.tsx
'use client';

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useCallback, // Importa useCallback
} from 'react';
import { useRouter, usePathname } from 'next/navigation'; // usar usePathname para evitar bucles
import * as authService from '@/lib/auth'; // Importa todo desde lib/auth
import type { User } from '@/lib/auth'; // Importa el tipo User

// Interfaz para el valor del Contexto
export interface AuthContextType {
    user: User | null;
    loading: boolean; // Indica carga inicial y durante login/logout
    login: (credentials: authService.LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    // Puedes añadir register si quieres manejarlo globalmente
    // register: (data: authService.RegisterData) => Promise<User>;
}

// Crea el contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// Props para el Provider
type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Empieza cargando para verificar sesión
    const router = useRouter();
    const pathname = usePathname(); // Obtiene la ruta actual

    // Función memoizada para verificar la sesión del usuario
    const checkAuthStatus = useCallback(async () => {
        setLoading(true);
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            // Error ya logueado en getCurrentUser
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []); // Sin dependencias, solo se crea una vez

    // Verificar sesión al montar el componente
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]); // Ejecutar cuando checkAuthStatus cambia (solo al inicio)

    // Función de Login
    const login = async (credentials: authService.LoginCredentials) => {
        setLoading(true);
        try {
            const loggedInUser = await authService.loginUser(credentials);
            setUser(loggedInUser);
            // Redirige al dashboard u otra página deseada tras login
            router.push('/');
        } catch (error) {
            console.error('Login failed in context:', error);
            setUser(null); // Asegurarse de limpiar el usuario si falla el login
            // Re-lanza el error para que el componente de login pueda mostrar un mensaje
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Función de Logout
    const logout = async () => {
        setLoading(true);
        try {
            await authService.logoutUser(); // Llama a la función de logout (principalmente limpia token)
        } catch (error) {
            console.error('Logout failed in context:', error);
            // Aún si falla la llamada API (si existe), proceder con el logout local
        } finally {
            setUser(null);
            setLoading(false);
            // Redirige a la página de login
            router.push('/login');
        }
    };

    // --- Protección básica del lado del cliente ---
    // Redirigir si no está autenticado y intenta acceder a rutas protegidas
    useEffect(() => {
        // No hacer nada si aún está cargando la verificación inicial
        if (loading) return;

        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/reset-password');
        const isProtectedPage = !isAuthPage; // Asumir que todo lo demás es protegido

        console.log('user actual', user);

        // Si no hay usuario Y está en una página protegida -> redirigir a login
        if (!user && isProtectedPage) {
            // console.log('User not authenticated, redirecting to login from:', pathname);
            router.push('/login');
        }
        // Opcional: Si HAY usuario Y está en una página de autenticación -> redirigir al dashboard
        else if (user && isAuthPage) {
            //   console.log('User authenticated, redirecting to dashboard from:', pathname);
            router.push('/');
        }

    }, [user, loading, router, pathname]); // Depende del usuario, carga, router y ruta

    // Valor del contexto
    const value: AuthContextType = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user && !loading, // Considerar no autenticado mientras carga
    };

    // No renderizar children hasta que termine la carga inicial si se accede a ruta protegida
    // Esto evita flashes de contenido protegido antes de la redirección.
    // O renderizar un loader global.
    // if (loading && !pathname.startsWith('/login') /*&& otras rutas públicas*/) {
    //    return <div>Verificando sesión...</div>; // O un spinner global
    // }


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado (se exporta desde hooks/useAuth.ts)