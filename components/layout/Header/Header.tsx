'use client';
import { useState, useEffect } from 'react';
import { Button, Navbar, Drawer, DrawerItems } from 'flowbite-react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Profile from './Profile';
import Notification from './Notification';
import MobileSidebar from '../Sidebar/MobileSidebar';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    return (
        <>
            <header
                className={`sticky top-0 z-[5] ${isSticky
                    ? "bg-white dark:bg-dark fixed w-full"
                    : "bg-white dark:bg-transparent"
                    }`}
            >
                <Navbar
                    fluid
                    className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4`}
                >
                    <div className='flex gap-3 items-center justify-between w-full'>
                        <div className='flex gap-2 items-center'>
                            <span
                                onClick={() => setIsOpen(true)}
                                className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
                            >
                                <Icon
                                    icon="solar:hamburger-menu-line-duotone" height={21}
                                />
                            </span>
                            <Notification />
                        </div>
                        <div className='flex gap-4 items-center'>
                            <Profile />
                        </div>
                    </div>
                </Navbar>
            </header>
            <Drawer open={isOpen} onClose={handleClose}>
                <DrawerItems>
                    <MobileSidebar handleClose={handleClose} />
                </DrawerItems>
            </Drawer>
        </>
    );
}

export default Header;