import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContainer = ({ children, className }: CardProps) => {
    return <div className={`shadow rounded ${className}`}>{children}</div>;
};

export const Card = ({ children, className }: CardProps) => {
    return <div className={`${className}`}>{children}</div>;
};

export const CardHeader = ({ children }: CardProps) => {
    return (
        <div className="flex items-center justify-between bg-white p-2 rounded-t-md border-b border-b-gray-200">
            {children}
        </div>
    );
};
 
export const CardHeaderContent = ({ children, className }: CardProps) => {
    return <div className={`${className}`}>{children}</div>;
};

export const CardBody = ({ children, className }: CardProps) => {
    return <div className={`overflow-x-auto bg-white ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className }: CardProps) => {
    return <div className={`bg-white rounded-b-md p-2 ${className}`}>{children}</div>;
};