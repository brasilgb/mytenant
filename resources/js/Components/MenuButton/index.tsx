import React, { useState } from 'react'
import SideMenu from "../SideMenu";
import { Link } from "@inertiajs/react";
import { IoExit } from "react-icons/io5";

const MenuButton = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleOpenMenu = () => {
        setOpenMenu(state => !state);
    }

    const MHamburger = () => {
        return (
            <div className="h-5 w-5 flex flex-col items-center justify-between">
                <div className="h-1 w-5 bg-gray-400" />
                <div className="h-1 w-5 bg-gray-400" />
                <div className="h-1 w-5 bg-gray-400" />
            </div>
        );
    }

    const MClose = () => {
        return (
            <div className="relative h-5 w-5 flex flex-col items-center justify-center gap-2">
                <div className="h-1 w-5 absolute bg-gray-700 rotate-45 rounded-md" />
                <div className="h-1 w-5 absolute bg-gray-700 -rotate-45 rounded-md" />
            </div>
        );
    }

    return (
        <>
            <div className={`absolute w-8 h-8 -top-4 right-0 ${openMenu ? 'bg-white text-gray-700' : 'text-white'} rounded-full flex items-center justify-center z-[101]`}>
                <button
                    onClick={() => handleOpenMenu()}
                >
                    {openMenu ? <MClose /> : <MHamburger />}
                </button>
            </div>
            <div className={`fixed top-12 right-0 bottom-0 left-0 bg-white z-10 transition-transform ${!openMenu ? '-translate-x-full' : '-translate-x-0'} z-[101]`}>
                <SideMenu openSide={openMenu} />
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex items-center h-10 p-2 text-sm gap-x-2 text-gray-500 hover:bg-gray-100 px-3 w-full"
                >
                    <IoExit size={20} />
                    <span className="origin-left duration-300">Sair</span>
                </Link>
            </div>
        </>
    );
};

export default MenuButton;