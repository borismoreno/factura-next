'use client;'
import { useEffect, ReactElement } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop({ children }: { children: ReactElement | null }) {
    const pathName = usePathname();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathName]);

    return children || null;
} 