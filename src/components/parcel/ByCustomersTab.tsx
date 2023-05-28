import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
// import UserManagerEditFormWrapper from "./UserManagerEditFromWrapper";
import ByUserManagerTableWrapper from "./ByUserManagerTableWrapper";

export default function CustomersTab(){

  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(()=>searchParams.get("pageType")? searchParams.get("pageType") : "table",[searchParams])

    return (
        <ContainerLayout>
          {page === "table" && (
             <ByUserManagerTableWrapper roleId={5} editRow={(value: any)=>{
              setSearchParams({pageType: "form", userId: value.id})
             }} 
             />
            )}
            {/* {page === "form" && (
             <UserManagerEditFormWrapper back={()=>setSearchParams({pageType: "table"})}/>
           )} */}
        </ContainerLayout>
    )
}