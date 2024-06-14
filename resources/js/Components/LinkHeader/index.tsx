import { Link } from '@inertiajs/react'
import React from 'react'

interface LinkHeaderProps {
    label: string;
    url: string;
    active: boolean;
}

const LinkHeader = (props: LinkHeaderProps) => {
    return (
        <Link
            href={route(props.url)}
            className={`${props.active ? 'bg-automa-green-primary text-gray-50' : 'text-automa-green-terciary border-automa-green-terciary'} border border-gray-100 uppercase font-semibold text-xs w-28 text-center rounded-md py-2 hover:bg-automa-green-secundary hover:text-gray-200 duration-300`}
        >
            {props.label}
        </Link>
    )
}

export default LinkHeader