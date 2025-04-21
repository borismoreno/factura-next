// app/(auth)/layout.tsx
'use client';

// import { useAuth } from '@/hooks/useAuth';
import React, { useEffect } from 'react'; // Necesario para React.ReactNode
// import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    // Lógica opcional de redirección (useAuth, useRouter) iría aquí
    // import { useAuth } from '@/hooks/useAuth';
    // const { user, loading } = useAuth();
    // const router = useRouter();
    // useEffect(() => { ... }, []);
    // useEffect(() => {
    //     if (!loading && user) {
    //         router.push('/');
    //     }
    // }, [user, loading, router]);

    // if (loading) {
    //     return (
    //         <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-gray-600">
    //             Cargando...
    //         </div>
    //     );
    // }

    // if (user) {
    //     return null;
    // }

    const gradientStyle = {
        background: "linear-gradient(45deg, rgb(238, 119, 82,0.2), rgb(231, 60, 126,0.2), rgb(35, 166, 213,0.2), rgb(35, 213, 171,0.2))",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        height: "100vh",
    };

    return (
        <div style={gradientStyle} className="relative overflow-hidden h-screen">
            {/* Card con sombra, padding, ancho máximo */}
            <div className="flex h-full justify-center items-center px-4">
                <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 w-full md:w-96 border-none">
                    <div className="flex flex-col gap-2 p-0 w-full">
                        {children}
                    </div>
                </div>
                {/* Opcional: Logo o Título común */}
                {/* <img src="/logo.svg" alt="Logo" className="mx-auto mb-6 h-12 w-auto" /> */}
            </div>
        </div>
    );
}

/* CSS en app/(auth)/authLayout.module.css (igual que antes) */