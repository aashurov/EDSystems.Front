import React, { ReactNode } from "react";
import "./assets/tab.scss";

interface TabPageProps{
    readonly children: ReactNode;
    readonly childrenClassName?: string;
    readonly headerComponent?: ReactNode;
    readonly footerComponent?: ReactNode;
    readonly className?: string;
    readonly headerClassName?: string;
    readonly footerClassName?: string;
}

export default function TabPage({children, childrenClassName, className, headerComponent, headerClassName, footerComponent, footerClassName}:TabPageProps){
    return (
        <div className={`app-tab-page ${className}`}>
           {headerComponent && (
            <div className={`header-component ${headerClassName}`}>
             {headerComponent}
            </div>
           )}
            <div className={`app-tab-page-children ${childrenClassName} ${(!headerComponent && !footerComponent)?'height-100':(!headerComponent && footerComponent)?'height-90':(headerComponent && !footerComponent)?'height-90':'height-80'}`}>
                {children}
            </div>
            {footerComponent && (
            <div className={`footer-component ${footerClassName}`}>
                {footerComponent}
            </div>
            )}
        </div>
    )
}