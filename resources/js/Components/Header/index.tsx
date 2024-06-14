import { Link, usePage } from "@inertiajs/react"
import ApplicationLogo from "../ApplicationLogo"
import LinkHeader from "../LinkHeader"
import MenuButton from "../MenuButton"
import Profile from "../Profile"

const Header = () => {
    const { auth } = usePage().props as any;
    return (
        <header className="flex items-center justify-between h-14 px-4 bg-[#FFFFFF] shadow-sm  sticky top-0 z-40">
            <div className="container mx-auto flex items-center justify-between">
                <div className="w-44 mr-8">
                    <Link
                        href={route('dashboard')}
                    >
                        <ApplicationLogo />
                    </Link>
                </div>
                <div className="flex-1 md:flex hidden items-center justify-start gap-4">
                    <LinkHeader label="Dashboard" url="dashboard" active={route().current('dashboard')} />
                    {auth?.user?.company_id === null &&
                        <LinkHeader label="Empresas" active={route().current('companies.*')} url="companies.index" />
                    }
                    {auth?.user?.company_id !== null &&
                        <LinkHeader label="Faturamento" active={route().current('sales')} url="sales" />
                    }
                </div>
                <div className="flex items-center justify-end">
                    <div className="relative md:hidden">
                        <MenuButton />
                    </div>
                    <div className="hidden md:flex">
                        <LinkHeader label="Usuários" url="users.index" active={route().current('users.*')} />
                    </div>
                    <Profile />
                </div>
            </div>
        </header>
    )
}

export default Header