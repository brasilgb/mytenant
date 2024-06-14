import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { IoMdUnlock } from "react-icons/io";
import { IoExit, IoPerson } from 'react-icons/io5';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Profile = () => {
    const { auth } = usePage().props as any;
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(old => !old);
    };
    const transClass = isOpen ? 'flex' : 'hidden';

    return (
        <>
            <div className="relative md:flex hidden">
                <button
                    className="flex items-center justify-between px-2"
                    onClick={toggle}
                >
                    <div className="text-gray-700">
                        <IoPerson size={20} />
                    </div>
                    <div className="text-gray-700">
                        <MdOutlineKeyboardArrowDown size={20} className={`duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
                    </div>
                </button>
                <div
                    className={`absolute top-11 right-0 z-30 md:w-[350px] flex flex-col py-4 bg-gray-50 rounded-md shadow-lg border border-white ${transClass}`}
                >
                    <span
                        className="text-sm text-gray-600 px-4 pb-3 flex items-center"
                    >
                        <IoMdUnlock color="#6d6a6a" size={20} />
                        <span className="ml-1">{auth?.user?.name}</span>
                    </span>
                    <span className="w-full border-b border-gray-200"></span>
                    <Link
                        className="text-gray-600 hover:text-gray-400 px-4 pt-2 flex items-center"
                        href="/imgapp"
                        onClick={toggle}
                    >
                        <IoPerson color="#6d6a6a" size={20} />
                        <span className="ml-1">Profile</span>
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-gray-600 hover:text-gray-400 px-4 pt-2 flex items-center"
                    >
                        <IoExit color="#6d6a6a" size={20} />
                        <span className="ml-1">Sair</span>
                    </Link>

                </div>
            </div>
            {isOpen ? (
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/5"
                    onClick={toggle}
                ></div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Profile;