import React, { useState , useEffect, useMemo} from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import RoleManagerFormWrapper from "../role/RoleManagerFormWrapper";
import RoleManagerTableWrapper from "../role/RoleManagerTableWrapper";

export default function RoleManagerTab(){
    const [searchParams, setSearchParams] = useSearchParams();
    const page = useMemo(()=>searchParams.get("pageType")? searchParams.get("pageType") : "table",[searchParams])
    return (
        <ContainerLayout>
            {page == "table" && (
                <RoleManagerTableWrapper editRow={(value: any)=>{
                    setSearchParams({ pageType: "form", roleId: value.id})
                }} 
                create={()=>{
                    setSearchParams({pageType: "form"})
                }}/>
            )}
            {(page == "form") && (
                <RoleManagerFormWrapper back={()=>setSearchParams({pageType: "table"})}/>
            )}
           
        </ContainerLayout>
    )
}