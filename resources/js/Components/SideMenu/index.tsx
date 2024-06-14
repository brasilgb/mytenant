import React from 'react'
import SideLink from "../SideLink";
import { GiReceiveMoney } from "react-icons/gi";
import { IoColorPalette, IoHome, IoPerson } from "react-icons/io5";
import { IoIosBusiness } from "react-icons/io";
import { usePage } from "@inertiajs/react";

interface SideMenuProps {
    openSide: any;
}

const SideMenu = (props: SideMenuProps) => {
    const { auth } = usePage().props as any;
    return (
        <ul className='mt-12 flex flex-col gap-2'>
            <SideLink
                url={route('dashboard')}
                icon={<IoHome size={24} />}
                openSide={props.openSide}
                active={route().current('dashboard')}
                label="Dashboard"
            />
            {auth?.user?.company_id === null &&

                <SideLink
                    url={route('companies.index')}
                    icon={<IoIosBusiness size={24} />}
                    openSide={props.openSide}
                    active={route().current('companies.*')}
                    label="Empresas"
                />
            }

            {auth?.user?.company_id !== null &&
                <SideLink
                    url={route('sales')}
                    icon={<GiReceiveMoney size={24} />}
                    openSide={props.openSide}
                    active={route().current('sales')}
                    label="Faturamento"
                />
            }

            {/* <SideLink
                url={route('companies.index')}
                icon={<IoColorPalette size={24} />}
                openSide={props.openSide}
                active={route().current('companies.index')}
                label="Aparência"
            /> */}

            <SideLink
                url={route('users.index')}
                icon={<IoPerson size={24} />}
                openSide={props.openSide}
                active={route().current('users.*')}
                label="Usuários"
            />
        </ul>
    )
}

export default SideMenu