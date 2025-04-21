// components/ui/Button/Button.tsx
'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx'; // Utilidad para construir classNames condicionales

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean; // Para mostrar estado de carga
    leftIcon?: React.ReactElement; // Icono a la izquierda
    rightIcon?: React.ReactElement; // Icono a la derecha
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    disabled,
    className,
    leftIcon,
    rightIcon,
    ...props
}) => {
    // Clases base (comunes a todos los botones)
    const baseClasses = 'inline-flex items-center justify-center rounded-md border font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed';

    // Clases por variante
    const variantClasses: Record<ButtonVariant, string> = {
        primary: 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-600',
        danger: 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        ghost: 'border-transparent bg-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700',
        outline: 'border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-800',
    };

    // Clases por tamaño
    const sizeClasses: Record<ButtonSize, string> = {
        small: 'px-3 py-1.5 text-xs',
        medium: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base',
        icon: 'p-2', // Tamaño específico para botones de solo icono
    };

    // Clases para el estado de carga
    const loadingClasses = isLoading ? 'relative cursor-wait' : '';

    const combinedClassName = clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        loadingClasses,
        className // Permite añadir clases personalizadas desde fuera
    );

    return (
        <button
            className={combinedClassName}
            disabled={disabled || isLoading}
            {...props}
        >{children}
            {isLoading && (
                // Spinner de carga (ejemplo simple)
                <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            )}
            {/* Ocultar contenido real cuando está cargando si no es un botón de icono */}
            {/* <span className={clsx('inline-flex items-center gap-2', { 'invisible': isLoading && size !== 'icon' })}>
        {leftIcon && !isLoading && React.cloneElement(leftIcon, { className: clsx(leftIcon.props.className, 'h-4 w-4') })}
        {size !== 'icon' && children}
        {rightIcon && !isLoading && React.cloneElement(rightIcon, { className: clsx(rightIcon.props.className, 'h-4 w-4') })}
      </span> */}
        </button>
    );
}

export default Button;