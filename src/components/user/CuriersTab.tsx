import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import UserManagerEditFormWrapper from "./UserManagerEditFromWrapper";
import UserManagerTableWrapper from "./UserManagerTableWrapper";

export default function CuriersTab(){

  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(()=>searchParams.get("pageType")? searchParams.get("pageType") : "table",[searchParams])

    return (
        <ContainerLayout>
            {page === "table" && (
             <UserManagerTableWrapper roleId={4} editRow={(value: any)=>{
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