import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "../icons/MenuIcon";
import LogoutButton from "./LogoutButton";
import MenuButton from "./MenuButton";

interface HeaderProps{
    readonly menuButton: ()=>void;
}

export default function Header({menuButton}:HeaderProps){
    const navigate = useNavigate();
    return (
    <header className="w-100 h-100 d-flex justify-content-between align-items-center px-3" style={{ backgroundColor: '#2e5c87'}}>
           <MenuButton onClick={menuButton}/>
           <LogoutButton onClick={()=>{
                localStorage.removeItem("token");
                navigate('/')
           }}/>
    </header>
    )
}