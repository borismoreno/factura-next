'use client';
import { Spinner } from 'flowbite-react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
}

export default function Loader({ size = 'md', message = 'Cargando...' }: LoaderProps) {
    let spinnerSize = 'h-5 w-5';
    if (size === 'lg') {
        spinnerSize = 'h-10 w-10';
    } else if (size === 'sm') {
        spinnerSize = 'h-3 w-3';
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <Spinner className={spinnerSize} size={size} />
            {message && <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>}
        </div>
    );
}