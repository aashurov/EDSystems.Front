import React from "react";
import Button from "../button/Button";
import LogoutIcon from "../icons/LogoutIcon";
import MenuIcon from "../icons/MenuIcon";

interface LogoutButtonProps{
    readonly onClick: ()=>void;
}

export default function LogoutButton({onClick}:LogoutButtonProps){

    return (
        <Button
            onClick={onClick}
            className="px-3 py-1 hover"
            // style={{background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))`}}
            >
               <span className="text-light me-2">
               Выход
               </span>
            <LogoutIcon/>
        </Button>
    )
}