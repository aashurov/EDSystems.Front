import React, { useMemo} from "react";
import { useSearchParams } from "react-router-dom";
import ContainerLayout from "../app/ContainerLayout";
import BranchFormWrapper from "../branch/BranchFormWrapper";
import BranchTableWrapper from "../branch/BranchTableWrapper";

export default function BranchTab(){
  const [search, setSearch] = useSearchParams();
  const tab = useMemo(()=>search.get("pageType")? search.get("pageType") : 'table',[search])


    return (
        <ContainerLayout>
            {tab === "table" && (
              <BranchTableWrapper selectRow={(value: any)=>{
                setSearch({pageType: "form", branchId: value.id})
              }} 
              create={()=>{
                setSearch({pageType: "form"})
              }}/>
            )}
           {tab === "form" && (
             <BranchFormWrapper back={()=>setSearch({pageType: "table"})}/>
           )}
        </ContainerLayout>
    )
}