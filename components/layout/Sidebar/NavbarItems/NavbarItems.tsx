import { ChildItem, MenuItem } from '../SidebarItems';
import { SidebarItem } from 'flowbite-react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface NavbarItemsProps {
    item: ChildItem;
    handleClose?: () => void;
}

const NavbarItems: React.FC<NavbarItemsProps> = ({ item, handleClose }) => {
    const pathname = usePathname();
    return (
        <>
            <SidebarItem
                href={item.url}
                as={Link}
                onClick={() => handleClose && handleClose()}
                className={`${item.url == pathname
                    ? "text-white bg-primary rounded-xl hover:text-white hover:bg-primary dark:hover:text-white shadow-btnshdw active"
                    : "text-link bg-transparent group/link rounded-xl"
                    } `}>
                <span className='flex items-center gap-2'>
                    {item.icon ? (<Icon icon={item.icon} className={`${item.color}`} height={18} />) : (<span className={`${item.url == pathname
                        ? "dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary !bg-primary h-[6px] w-[6px]"
                        : "h-[6px] w-[6px] bg-black/40 dark:bg-white rounded-full mx-1.5 group-hover/link:bg-primary"
                        } `}></span>)}
                    <span
                        className={`max-w-36 overflow-hidden`}
                    >
                        {item.name}
                    </span>
                </span>
            </SidebarItem>
        </>
    );
};

export default NavbarItems;