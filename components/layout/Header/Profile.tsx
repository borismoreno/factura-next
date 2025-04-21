'use client';
import { Button, Dropdown, DropdownItem } from 'flowbite-react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import user1 from "../../../assets/images/profile/user-1.jpg";

const Profile = () => {
    const { user, logout } = useAuth();
    return (
        <div className='relative group/menu'>
            <Dropdown
                label=''
                className='rounded-sm w-44'
                dismissOnClick={false}
                renderTrigger={() => (
                    <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
                        <Image src={user1} alt='logo' height='35' width='35' className='rounded-full' />
                    </span>
                )}
            >
                <DropdownItem
                    as={Link}
                    href='#'
                    className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
                >
                    <Icon icon='solar:user-circle-outline' height={20} />
                    {user?.nombre || user?.email}
                </DropdownItem>
                <DropdownItem
                    as={Link}
                    href='#'
                    className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
                >
                    <Icon icon='solar:settings-outline' height={20} />
                    Configuración
                </DropdownItem>
                <div className="p-3 pt-0">
                    <Button size={'sm'} onClick={logout} className="mt-2 border border-primary text-primary bg-transparent w-full cursor-pointer rounded-xl hover:bg-lightprimary outline-none" outline>Salir</Button>
                </div>
            </Dropdown>
        </div>
    );
}

export default Profile;