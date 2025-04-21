// hooks/useAuth.ts
'use client';

import { useContext } from 'react';
// Importa el Contexto y el Tipo del Contexto
import { AuthContext, AuthContextType } from '@/context/AuthContext'; // Asegúrate que la ruta sea correcta

// El hook devuelve el tipo definido para el contexto
export const useAuth = (): AuthContextType => {
    // Especifica el tipo esperado al usar useContext
    const context = useContext<AuthContextType | null>(AuthContext);

    // Comprueba si el contexto es null
    if (context === null) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }

    return context;
};