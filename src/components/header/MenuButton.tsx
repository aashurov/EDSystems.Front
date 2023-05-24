import React from "react";
import Button from "../button/Button";
import MenuIcon from "../icons/MenuIcon";

interface MenuButtonProps{
    readonly onClick: ()=>void;
}

export default function MenuButton({onClick}:MenuButtonProps){
    return (
        <Button
            onClick={onClick}
            className="px-2 py-1 hover"
            >
            <MenuIcon/>
        </Button>
    )
}