import { InputHTMLAttributes } from 'react';

export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-megb-blue-terciary shadow-sm focus:bg-megb-blue-secundary ' +
                className
            }
        />
    );
}
