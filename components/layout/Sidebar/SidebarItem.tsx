// components/layout/Sidebar/SidebarItem.tsx
'use client';

import Link from 'next/link';
import React from 'react';
// import { IconType } from 'react-icons';

interface SidebarItemProps {
    href: string;
    label: string;
    // icon?: IconType;
    isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, label, /*icon: Icon,*/ isActive }) => {
    // Clases base y clases condicionales para el estado activo
    const baseClasses = "group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-slate-300 duration-300 ease-in-out hover:bg-slate-700 hover:text-white dark:hover:bg-slate-700";
    const activeClasses = "bg-slate-700 text-white dark:bg-slate-600"; // Clases cuando está activo

    return (
        <li> {/* El <li> es necesario para la estructura ul>li */}
            <Link href={href} className={`${baseClasses} ${isActive ? activeClasses : ''}`}>
                {/* {Icon && <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />} */}
                <span>{label}</span>
                {/* Opcional: Indicador visual de activo (ej: una barra lateral) */}
                {/* {isActive && <span className="absolute right-0 top-0 h-full w-1 bg-blue-500 rounded-sm"></span>} */}
            </Link>
        </li>
    );
}

export default SidebarItem;