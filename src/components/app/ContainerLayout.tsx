import React, { ReactNode } from "react";

interface ContainerLayoutProps{
    readonly children: ReactNode;
    readonly className?: string; 
}

export default function ContainerLayout({children, className}:ContainerLayoutProps){
    return (
        <div className={`w-100 h-100 p-2 ${className}`}>
            {children}
        </div>
    )
}