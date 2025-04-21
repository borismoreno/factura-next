// components/ui/Card/Card.tsx
import React, { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    children: ReactNode;
    customTitle?: string | ReactNode; // Permite título como string o como otro componente
    footer?: ReactNode; // Contenido opcional para el pie de la tarjeta
    padding?: 'none' | 'small' | 'medium' | 'large'; // Control de padding
}

const Card: React.FC<CardProps> = ({
    children,
    customTitle: title,
    footer,
    className,
    padding = 'medium', // Padding por defecto
    ...props
}) => {

    const paddingClasses: Record<typeof padding, string> = {
        none: 'p-0',
        small: 'p-3 sm:p-4',
        medium: 'p-4 sm:p-6',
        large: 'p-6 sm:p-8',
    }

    const cardClasses = clsx(
        'overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
        className // Clases externas
    );

    const contentClasses = clsx(
        'text-gray-700 dark:text-gray-300',
        paddingClasses[padding] // Aplica padding al contenido
    );

    const titleClasses = clsx(
        'border-b border-gray-200 px-4 py-3 text-lg font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:px-6',
        padding === 'none' ? 'px-4 py-3 sm:px-6' : paddingClasses[padding], // Ajusta padding del título si el contenido no tiene
        { 'pb-0': padding !== 'none' } // Quita padding inferior si el contenido tiene padding
    );

    const footerClasses = clsx(
        'border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6',
        // Puedes ajustar el padding del footer similar al title si es necesario
    );


    return (
        <div className={cardClasses} {...props}>
            {title && (
                <div className={titleClasses}>
                    {title}
                </div>
            )}
            <div className={contentClasses}>
                {children}
            </div>
            {footer && (
                <div className={footerClasses}>
                    {footer}
                </div>
            )}
        </div>
    );
}

export default Card;