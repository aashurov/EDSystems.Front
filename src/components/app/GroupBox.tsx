import React, { ReactNode } from "react";
import "./assets/group-box.scss";

interface GroupBoxProps{
    readonly title?: string;
    readonly children: ReactNode;
    readonly className?: string;
}

export default function GroupBox({children, title, className}:GroupBoxProps){
    return (
        <div className={`group-box-container ${className}`}>
            {title && (
            <span className="group-box-title px-2 bg-white fs-5 font-weight-bold position-absolute group-title">
                {title}
            </span>
            )}
            <div className="group-box-children">
                {children}
            </div>
        </div>
    )
}