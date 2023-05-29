import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
//  import UserManagerEditFormWrapper from "./UserManagerEditFromWrapper";
import ByUserManagerTableWrapper from "./ByUserManagerTableWrapper";
import ByCourierParcelTableWrapper from "./ByCourierParcelTableWrapper";

export default function CouriersTab(){

  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(()=>searchParams.get("pageType")? searchParams.get("pageType") : "table",[searchParams])

    return (
        <ContainerLayout>
            {page === "table" && (
             <ByUserManagerTableWrapper  roleId={4} 
             editRow={(value: any)=>{
              setSearchParams({pageType: "form", userId: value.id})
             }} 
          
             />
            )}
            {page === "curier-parcel-tab" && (
            <ByCourierParcelTableWrapper/>
           )}
        </ContainerLayout>
    )
}