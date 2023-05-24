import React, { ReactNode } from "react";

interface TableButtonProps{
    readonly children: ReactNode;
    readonly onClick?: ()=>void;
    readonly className?: string;
}

export default function TableButton({children, onClick, className}:TableButtonProps){
    return (
        <button className={`${className} rounded p-2 text-light d-flex justify-content-center align-items-center`} style={{border: 'none'}} onClick={onClick}>
            {children}
        </button>
    )
}