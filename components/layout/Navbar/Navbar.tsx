// components/layout/Navbar/Navbar.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button/Button';
import React from 'react';
// import Image from 'next/image'; // Si usas avatares

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-30 flex w-full border-b border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:px-6">
            <div className="flex flex-grow items-center justify-between">
                {/* Lado Izquierdo: Podría tener un título de página o buscador */}
                <div className="flex items-center gap-3">
                    {/* Botón para abrir Sidebar en móvil (si no está en Sidebar.tsx) */}
                    {/* <button className="lg:hidden"> <FaBars /> </button> */}
                    {/* <h1 className="hidden sm:block text-lg font-semibold text-gray-800 dark:text-gray-200">Dashboard</h1> */}
                </div>

                {/* Lado Derecho: Notificaciones, Perfil, Logout */}
                <div className="flex items-center gap-3 2xsm:gap-7">
                    {/* Aquí podrías añadir iconos de notificaciones, etc. */}

                    {/* Menú de Usuario */}
                    {user ? (
                        <div className="relative flex items-center gap-4">
                            <span className="text-left lg:text-right">
                                <span className="block text-sm font-medium text-black dark:text-white">
                                    {user.nombre || user.email}
                                </span>
                                <span className="hidden lg:block text-xs text-gray-500">{user.email}</span> {/* Ejemplo */}
                            </span>

                            {/* Avatar (ejemplo) */}
                            {/* <span className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"> */}
                            {/* <Image src={user.avatarUrl || '/default-avatar.png'} width={40} height={40} alt="Avatar" /> */}
                            {/* O iniciales: */}
                            {/* <span className="font-medium text-gray-600">{user.name ? user.name[0] : user.email[0]}</span> */}
                            {/* </span> */}

                            <Button onClick={logout} variant="secondary" size="small">
                                Salir
                            </Button>
                        </div>
                    ) : (
                        <div className="h-8 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-600"></div> // Placeholder de carga
                    )}
                </div>
            </div>
        </header>
    );
}