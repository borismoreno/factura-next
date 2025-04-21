// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next'; // Importa el tipo Metadata
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext'; // Verifica la ruta
import { ThemeModeScript, ThemeProvider } from 'flowbite-react';
import customTheme from '@/utils/theme/custom-theme';

const inter = Inter({ subsets: ['latin'] });

// Tipado explícito para metadata (opcional pero bueno)
export const metadata: Metadata = {
    title: 'Factura Agil',
    description: 'Proyecto con Next.js 14 App Router y TypeScript',
};

// Tipado de props para el Layout
interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="es">
            <body className={`${inter.className}`}>
                <ThemeModeScript />
                <ThemeProvider theme={customTheme}>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}