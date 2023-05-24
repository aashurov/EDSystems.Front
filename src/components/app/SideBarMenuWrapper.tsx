import React from "react";
import SideBarMenu from "./SideBarMenu";
import SideBarMenuLayout from "./SideBarMenuLayout";


export default function SideBarMenuWrapper(){
    return (
        <SideBarMenuLayout>
           <SideBarMenu/>
        </SideBarMenuLayout>
    )
}