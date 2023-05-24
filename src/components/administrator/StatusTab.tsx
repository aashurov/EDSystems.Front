import React, {useMemo} from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import StatusFormWrapper from "../status/StatusFormWrapper";
import StatusTableWrapper from "../status/StatusTableWrapper";

export default function StatusTab(){

    const [search, setSearch] = useSearchParams();
    const tab = useMemo(()=>search.get("formType")? search.get("formType") : 'table',[search])

    return (
        <ContainerLayout>
           {tab === "table" && (
             <StatusTableWrapper 
             selectRow={(value: any)=>{
              setSearch({formType: "form", statusId: value.id})
             }} 
             create={()=>{
              setSearch({formType: "form"})
             }}/>
           )}
           {tab === "form" && (
             <StatusFormWrapper back={()=> setSearch({formType: "table"})}/>
           )}
        </ContainerLayout>
    )
}