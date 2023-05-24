import React, { ReactNode } from "react";
import Loading from "../loading/Loading";
import "./assets/button.scss";

interface ButtonProps{
    readonly children: ReactNode;
    readonly onClick?: ()=>void;
    readonly className?: string; 
    readonly style?: any;
    readonly type?: 'button' | 'submit' | 'reset';
    readonly loading?: boolean;
    readonly disabled?: boolean;
}

export default function Button({ children, onClick, className, style, type = 'button', loading, disabled }:ButtonProps){
    return (
        <button disabled={disabled} type={type} className={`app-button ${className}`} onClick={onClick} style={style}>
           {loading?(
                <Loading/>
           ):(
            <>
            {children}
            </>
           )}
        </button>
    )
}