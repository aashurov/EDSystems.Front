import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import PlanFormWrapper from "../plan/PlanFormWrapper";
import PlanTableWrapper from "../plan/PlanTableWrapper";

export default function PlanTab(){
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(()=>searchParams.get("pageType")? searchParams.get("pageType") : "table",[searchParams])

    return (
        <ContainerLayout>
          {page === "table" && (
            <PlanTableWrapper 
                    selectRow={(value: any)=>{
                    setSearchParams({ pageType: "form", planId: value.id})
                    }} 
                    create={()=>{
                    setSearchParams({pageType: "form"})
                    }}/>
                     )}
          {page === "form" && (
                <PlanFormWrapper back={()=>setSearchParams({pageType: "table"})}/>
          )}
        </ContainerLayout>
    )
}