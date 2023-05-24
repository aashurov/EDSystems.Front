import React, { ReactNode } from "react";
import "./assets/form.scss";

interface AuthLayoutProps{
    readonly children: ReactNode;
    readonly className?: string;
}

export default function AuthLayout({children, className}:AuthLayoutProps){
    return (
        <div className={`auth-layout w-100 vh-100 d-flex justify-content-center align-items-center ${className}`}>
            {children}
        </div>
    )
}