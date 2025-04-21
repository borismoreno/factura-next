// app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
// import Button from '@/components/ui/Button/Button';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from 'next/link';
import FullLogo from '@/components/layout/Logo/FullLogo';

// import { FaEnvelope, FaLock } from 'react-icons/fa'; // Example icons
export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const { login, loading: authLoading } = useAuth(); // Usar loading del contexto

    // Tipar el evento del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ email, password });
            // Redirección manejada en AuthContext
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado.');
            }
        }
    };

    return (
        // Usar space-y para espaciado vertical entre elementos del form
        // <div className="flex flex-col gap-2 p-0 w-full">
        //     <p className="text-sm text-center text-dark dark:text-lightgray my-3">Iniciar Sesión</p>
        //     <form onSubmit={handleSubmit} className="space-y-6">
        //         {/* Muestra el error */}
        //         {error && (
        //             <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-200">
        //                 {error}
        //             </div>
        //         )}

        //         {/* Campo Email */}
        //         <div>
        //             <label
        //                 htmlFor="email"
        //                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        //             >
        //                 Correo Electrónico
        //             </label>
        //             <div className="relative mt-1 rounded-md shadow-sm">
        //                 {/* Icono Opcional */}
        //                 {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        //        <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //      </div> */}
        //                 <input
        //                     type="email"
        //                     id="email"
        //                     name="email"
        //                     autoComplete="off"
        //                     required
        //                     value={email}
        //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        //                     disabled={authLoading}
        //                     // Añadir pl-10 si usas icono
        //                     className="block w-full rounded-md border-gray-300 py-2 px-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-600"
        //                     placeholder="tu@email.com"
        //                 />
        //             </div>
        //         </div>

        //         {/* Campo Contraseña */}
        //         <div>
        //             <label
        //                 htmlFor="password"
        //                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        //             >
        //                 Contraseña
        //             </label>
        //             <div className="relative mt-1 rounded-md shadow-sm">
        //                 {/* Icono Opcional */}
        //                 {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        //        <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
        //      </div> */}
        //                 <input
        //                     type="password"
        //                     id="password"
        //                     name="password"
        //                     autoComplete="current-password"
        //                     required
        //                     value={password}
        //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        //                     disabled={authLoading}
        //                     // Añadir pl-10 si usas icono
        //                     className="block w-full rounded-md border-gray-300 py-2 px-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-600"
        //                     placeholder="••••••••"
        //                 />
        //             </div>
        //         </div>

        //         {/* Botón de Envío */}
        //         <div>
        //             <Button
        //                 type="submit"
        //                 variant="primary"
        //                 size="medium"
        //                 isLoading={authLoading} // Pasa el estado de carga al botón
        //                 className="w-full" // Hacer que ocupe todo el ancho
        //             >
        //                 {authLoading ? 'Ingresando...' : 'Ingresar'}
        //             </Button>
        //             <BtnFlow className='shadow-tw' color='alternative'>Click me<Badge className="ms-2 rounded-full px-1.5">2</Badge></BtnFlow>
        //         </div>
        //     </form>

        //     {/* Enlaces inferiores */}
        //     <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        //         ¿No tienes cuenta?{' '}
        //         <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
        //             Regístrate
        //         </Link>
        //         {' | '}
        //         <Link href="/reset-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
        //             ¿Olvidaste tu contraseña?
        //         </Link>
        //     </p>
        // </div>
        <>
            <FullLogo />
            <p className="text-sm text-center text-dark dark:text-lightgray my-3">Iniciar Sesión</p>
            {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900 dark:text-red-200">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="email">Email</Label>
                    </div>
                    <TextInput
                        id="email"
                        name='email'
                        autoComplete="off"
                        type="email"
                        sizing="md"
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        disabled={authLoading}
                        className="form-control form-rounded-xl"
                    />
                </div>
                <div className="mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="password">Contraseña</Label>
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name='password'
                        autoComplete="current-password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        disabled={authLoading}
                        sizing="md"
                        required
                        className="form-control form-rounded-xl"
                    />
                </div>
                <div className="flex justify-between my-5">
                    <div className="flex items-center gap-2">
                        <Checkbox id="accept" className="checkbox" />
                        <Label
                            htmlFor="accept"
                            className="opacity-90 font-normal cursor-pointer"
                        >
                            Recuérdame
                        </Label>
                    </div>
                    <Link href={"/reset-password"} className="text-primary text-sm font-medium">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <Button type="submit" color={"primary"} className="w-full bg-primary text-white rounded-xl">
                    Ingresar
                </Button>
            </form>
            <div className="flex gap-2 text-base text-ld font-medium mt-6 items-center justify-center">
                <p>¿No tienes cuenta?</p>
                <Link href="/register" className="text-primary text-sm font-medium">
                    Regístrate
                </Link>
            </div>
        </>
    );
}