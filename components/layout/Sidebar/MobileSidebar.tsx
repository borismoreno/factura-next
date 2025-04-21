import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import SidebarContent from "./SidebarItems";
import NavbarItems from "./NavbarItems/NavbarItems";
import SimpleBar from "simplebar-react";
import React from "react";
import FullLogo from "../Logo/FullLogo";
import 'simplebar-react/dist/simplebar.min.css';

interface MobileSidebarProps {
    handleClose?: () => void;
}

const MobileSidebar = ({ handleClose }: MobileSidebarProps) => {
    return (
        <>
            <div>
                <Sidebar className="fixed menu-sidebar pt-0 bg-white dark:bg-darkgray transition-all"
                    aria-label="Sidebar with multi-level dropdown example">
                    <div className="px-5 py-4 pb-7 flex items-center sidebarlogo">
                        <FullLogo />
                    </div>
                    <SimpleBar className="h-[calc(100vh_-_242px)]">
                        <SidebarItems className="px-5 mt-2">
                            <SidebarItemGroup>
                                {SidebarContent &&
                                    SidebarContent?.map((item, index) => (
                                        <div className="caption" key={item.heading}>
                                            <React.Fragment key={index}>
                                                <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">{item.heading}</h5>
                                                {item.children?.map((child, index) => (
                                                    <React.Fragment key={child.id && index}>
                                                        <NavbarItems item={child} handleClose={handleClose} />
                                                    </React.Fragment>
                                                ))}
                                            </React.Fragment>
                                        </div>
                                    ))}
                            </SidebarItemGroup>
                        </SidebarItems>
                    </SimpleBar>
                </Sidebar>
            </div>
        </>
    );
}

export default MobileSidebar;