// components/layout/Sidebar/Sidebar.tsx
'use client';

import { Sidebar, SidebarItems, SidebarItemGroup } from "flowbite-react";
import SimpleBar from "simplebar-react";
import FullLogo from "../Logo/FullLogo";
import NavbarItems from "./NavbarItems/NavbarItems";
import SidebarContent from "./SidebarItems";
import React from "react";

const SidebarLayout = () => {
    return (
        <>
            <div className="xl:block hidden">
                <Sidebar className="fixed menu-sidebar  bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0 "
                    aria-label="Sidebar with multi-level dropdown example">
                    <div className="px-6 py-4 flex items-center sidebarlogo"><FullLogo /></div>
                    <SimpleBar className="h-[calc(100vh_-_230px)]">
                        <SidebarItems className="px-5 mt-2">
                            <SidebarItemGroup className="sidebar-nav hide-menu">
                                {SidebarContent && SidebarContent.map((item, index) => (
                                    <div className="caption" key={item.heading}>
                                        <React.Fragment key={index}>
                                            <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                                                {item.heading}
                                            </h5>
                                            {item.children?.map((child, index) => (
                                                <React.Fragment key={child.id && index}>
                                                    <NavbarItems item={child} />
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
    )
}

export default SidebarLayout;