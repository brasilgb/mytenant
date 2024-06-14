import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `items-center py-3 bg-megb-blue-secundary rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-megb-blue-terciary focus:bg-megb-blue-secundary active:bg-megb-blue-terciary focus:outline-none focus:ring-2 focus:ring-megb-blue-secundary focus:ring-offset-2 transition ease-in-out duration-150 shadow-md border border-transparent ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
