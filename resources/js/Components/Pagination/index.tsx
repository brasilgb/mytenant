import { useAuthContext } from "@/Contexts";
import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import {
    RiArrowLeftDoubleLine,
    RiArrowLeftSLine,
    RiArrowRightDoubleLine,
    RiArrowRightSLine,
} from "react-icons/ri";
interface PaginationProps {
    data: any;
    analise?: any;
}

const Pagination = ({ data, analise }: PaginationProps) => {
    const {setAlteredAnalise} = useAuthContext();
    const clearLinks = [...data.links];
    clearLinks.shift();
    clearLinks.pop();

    useEffect(() => {
        setAlteredAnalise(analise);
    },[analise]);

    return (
        <ul className="flex items-center justify-center py-2">
            <li>
                {data.prev_page_url !== null ? (
                    <Link
                        className="flex items-center justify-center h-8 w-8 md:text-sm text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-600 duration-300"
                        href={data.first_page_url}
                    >
                        <RiArrowLeftSLine size={16} />
                    </Link>
                ) : (
                    <span className="flex items-center justify-center h-8 w-8 md:text-sm text-xs text-gray-300">
                        <RiArrowLeftSLine size={16} />
                    </span>
                )}
            </li>
            <li>
                {data.prev_page_url !== null ? (
                    <Link
                        className="flex items-center justify-center  h-8 w-8 md:text-sm text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-600 duration-300"
                        href={data.prev_page_url}
                    >
                        <RiArrowLeftDoubleLine size={16} />
                    </Link>
                ) : (
                    <span className="flex items-center justify-center h-8 w-8 md:text-sm text-xs text-gray-300">
                        <RiArrowLeftDoubleLine size={16} />
                    </span>
                )}
            </li>

            {clearLinks.map((link: any, idx: number) => (
                <li key={idx}>
                    <Link
                        className={`flex items-center justify-center rounded-full h-8 w-8 md:text-sm text-xs ${link.active ? "text-gray-50 bg-automa-green-terciary" : "text-gray-500 hover:bg-gray-100 hover:text-gray-600"} transition-colors duration-300`}
                        href={link.url}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}

            <li>
                {data.next_page_url !== null ? (
                    <Link
                        className="flex items-center justify-center  h-8 w-8 md:text-sm text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-600 duration-300"
                        href={data.next_page_url}
                    >
                        <RiArrowRightDoubleLine size={16} />
                    </Link>
                ) : (
                    <span className="flex items-center justify-center  h-8 w-8 md:text-sm text-xs text-gray-300 duration-300">
                        <RiArrowRightDoubleLine size={16} />
                    </span>
                )}
            </li>
            <li>
                {data.next_page_url !== null ? (
                    <Link
                        className="flex items-center justify-center  h-8 w-8 md:text-sm text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-600 duration-300"
                        href={data.last_page_url}
                    >
                        <RiArrowRightSLine size={16} />
                    </Link>
                ) : (
                    <span className="flex items-center justify-center  h-8 w-8 md:text-sm text-xs text-gray-300 duration-300">
                        <RiArrowRightSLine size={16} />
                    </span>
                )}
            </li>
        </ul>
    );
};

export default Pagination;
