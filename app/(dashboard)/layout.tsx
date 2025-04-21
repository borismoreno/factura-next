// app/(dashboard)/layout.tsx
'use client';

import { FC } from "react";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Header from "@/components/layout/Header/Header";
import ScrollToTop from "@/components/layout/ScrollToTop/ScrollToTop";

interface FullLayoutProps {
    children: React.ReactNode;
}
const FullLayout = ({ children }: FullLayoutProps) => {
    return (
        <>
            <div className="flex w-full min-h-screen dark:bg-darkgray">
                <div className="page-wrapper flex w-full  ">
                    <Sidebar />
                    <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
                        <Header />
                        <div className={`bg-lightgray dark:bg-dark  h-full rounded-bb`}>
                            <div className={`w-full`}>
                                <ScrollToTop>
                                    <div className="container py-30">{children}</div>
                                </ScrollToTop>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FullLayout;

// import React, { useEffect } from 'react';
// import Sidebar from '@/components/layout/Sidebar/Sidebar';
// import Navbar from '@/components/layout/Navbar/Navbar';
// import { useAuth } from '@/hooks/useAuth';
// import { useRouter } from 'next/navigation';

// interface DashboardLayoutProps {
//     children: React.ReactNode;
// }

// export default function DashboardLayout({ children }: DashboardLayoutProps) {
//     const { user, loading } = useAuth();
//     const router = useRouter();

//     useEffect(() => {
//         if (!loading && !user) {
//             router.push('/login');
//         }
//     }, [user, loading, router]);

//     if (loading) {
//         return (
//             <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-gray-600">
//                 Cargando dashboard...
//             </div>
//         );
//     }

//     if (!user) {
//         return null; // Redirección en proceso
//     }

//     return (
//         // Contenedor flex principal
//         <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
//             {/* Sidebar (posición fija o flex item) */}
//             <Sidebar />

//             {/* Área de contenido principal (Navbar + children) */}
//             <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
//                 {/* Navbar superior */}
//                 <Navbar />

//                 {/* Contenido de la página */}
//                 <main>
//                     <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
//                         {children}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }