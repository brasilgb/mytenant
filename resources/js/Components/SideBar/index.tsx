import { IoChevronForward } from "react-icons/io5";
import React, { useState } from 'react'
import ApplicationLogo from '../ApplicationLogo';
import SideMenu from "../SideMenu";

const SideBar = () => {
    const [openSide, setOpenSide] = useState(true);
    return (
        <aside className={`transition-all duration-300 ${openSide ? "md:w-72" : "w-20"} h-full md:block hidden relative bg-megb-blue-primary duration-300 p-5 pt-8 shadow-lg`}>

            <div onClick={() => setOpenSide(!openSide)} className={`${openSide ? "rotate-180 " : "0"} duration-300 absolute cursor-pointer flex items-center justify-center -right-2 w-7 h-7 rounded-full bg-white top-16 shadow-sm border-2 border-sky-800 text-sky-800 `}>
                <IoChevronForward />
            </div>
            <div className={`flex items-center h-24 ${openSide ? 'justify-center' : 'justify-start'}`}>
                <div className={`${openSide ? 'w-20' : 'w-10'}`}>
                    <ApplicationLogo />
                </div>
            </div>
            <div>
                <SideMenu openSide={openSide} />
            </div>
        </aside>
    )
}

export default SideBar