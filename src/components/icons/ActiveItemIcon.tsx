import React from "react";
import "./assets/icon.scss";

interface Props{
    readonly color?: string;
    readonly size?: number;
    readonly active?: boolean;
}

export default function ActiveItemIcon({color, size = 20, active}:Props){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`${active?'active-item-opened':'active-item-closed'}`} fill={color} width={size} height={size} viewBox="0 0 448 512">
           <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/>
        </svg>
    )
}