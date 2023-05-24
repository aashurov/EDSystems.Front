import React from "react";

interface Props{
    readonly color?: string;
    readonly size?: any;
}

export default function PreviousIcon({color, size = 20}:Props){
    return (
   
        <svg xmlns="http://www.w3.org/2000/svg" className="d-flex justify-content-center align-items-center" fill={color} width={size} height={size} viewBox="0 0 448 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        </svg>
    )
}