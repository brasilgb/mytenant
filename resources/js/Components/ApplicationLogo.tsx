import { usePage } from "@inertiajs/react";
interface ApplicationLogoProps {
    className?: string;
}
const ApplicationLogo = ({className}: ApplicationLogoProps) => {
    const { conf = [] } = usePage().props as any;

    return (
            <div className={className}>
                <img
                src={`/storage/images/${conf[0]?.logo ? conf[0]?.logo : "automahost.png"}`}
                alt="Logo"
            />
            </div>
    );
};

export default ApplicationLogo;