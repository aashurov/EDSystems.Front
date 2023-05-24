import React, { ReactNode } from "react";

export interface SideBarItemProps{
    readonly key: string;
    readonly children: ReactNode;
    readonly icon?: ReactNode;
    readonly show?: boolean;
    readonly responsiveContent?: ReactNode;
}

export default function SideBarItem({children, show = true}:SideBarItemProps){
    if(!show){
        return null;
    }
    return (<div>{children}</div>)
}