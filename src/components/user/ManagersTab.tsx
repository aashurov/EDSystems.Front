import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import UserManagerEditFormWrapper from "./UserManagerEditFromWrapper";
import UserManagerFormWrapper from "./UserManagerFormWrapper";
import UserManagerTableWrapper from "./UserManagerTableWrapper";

export default function ManagersTab(){
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(()=>searchParams.get("pageType")? searchParams.get("pageType") : "table",[searchParams])

    return (
        <ContainerLayout>
          {page === "table" && (
             <UserManagerTableWrapper roleId={2} editRow={(value: any)=>{
              setSearchParams({pageType: "form", userId: value.id})
             }} 
             />
            )}
            {page === "form" && (
             <UserManagerEditFormWrapper back={()=>setSearchParams({pageType: "table"})}/>
           )}
        </ContainerLayout>
    )
}