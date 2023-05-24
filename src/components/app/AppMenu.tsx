import React, { Children, ReactElement } from "react";
import { SideBarItemProps } from "./SideBarItem";
import "./assets/app-menu.scss";
import { useSelector } from "react-redux";
import ActiveItemIcon from "../icons/ActiveItemIcon";

interface AppMenuProps{
    readonly onChangeTab: (value: string) => void;
    readonly activeTab: string;
    readonly defaultTab: string;
    readonly children: ReactElement<SideBarItemProps>[] | ReactElement<SideBarItemProps>;
    readonly className?: string;
}

export default function AppMenu({onChangeTab, activeTab, children, className, defaultTab}:AppMenuProps){

    const menu = useSelector((state: any)=>state.data.menuStatus);
    
    return (
        <div className={`menu-item-list-container app-menu w-100 ${className}`}>
           
        {Children.map(children, (child)=>{
            return (
                <div className="item-container w-100">
                <div className={`w-100 item-header py-2 px-4 ${((activeTab == "" && defaultTab == child.key) || activeTab == child.key)? 'active-item' : '' } `} onClick={()=>onChangeTab(child.key as string)}>
                <div className="item-title w-100">
                        { child.props.icon && (
                        <span className="pe-3">{child.props.icon}</span>
                        )} 
                        {menu != "Opened" && (
                            <span className={`${menu == "Opened"? "opasity" :""}`}>{child.props.children}</span>
                        )}                            
                        </div>      
                        { child.props.responsiveContent && (
                        <ActiveItemIcon color="white" active={activeTab == child.key} size={15}/>
                        )}
                        </div>
                     { child.props.responsiveContent && activeTab == child.key && menu == "Closed" && (
                        <div className="responsive-content-box" style={{paddingLeft: '30px'}}>
                        <div className={`responsive-content`}>
                            {child.props.responsiveContent}
                     </div>
                     </div>
                     )}
            </div>
            )
        })}
</div>
    )
}