import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import RoleForm from "./RoleManagerForm";
import { useRoleApiContext } from "../../api/role/RoleApiContext";

interface RoleManagerFormWrapperProps{
    readonly back: () => void
}

export default function RoleManagerFormWrapper({back}:RoleManagerFormWrapperProps){
    
    const [searchParams, setSearchParams] = useSearchParams();
    const id = Number(searchParams.get("roleId"));
    const { RoleApi } = useRoleApiContext();

    const [initialValues, setInitialValues] = useState({
        name: "",
    })

    useEffect(()=>{
        if(id){
            RoleApi.getRoleById({id: id}).then((resp: any)=>setInitialValues(resp.data)).catch((err: any)=>console.log(err))
        }
    },[RoleApi, id])

    const submit = useCallback((value: any)=>{
       if(id){
        const data = {
            ...value,
            id: id
        }
        RoleApi.updateRole(data).then(()=>{
                toast.success("Updated!");
                setSearchParams({pageType: "table"})
            }).catch(()=>toast.error("Fail!"))
       }else{
        const data = {
            ...value,
            cost: Number(value.cost)
        }
        RoleApi.createRole(data).then(()=>{
                setSearchParams({pageType: "table"})
                toast.success("Added!")
            }).catch(()=>toast.error("Fail!"))
            }
    },[RoleApi, toast, searchParams, id])
    
    return (
    <TabPage 
        childrenClassName="p-3 pt-4"
        headerComponent={
            <Button onClick={back} className="bg-gold text-light mb-2 px-2 py-1">
                Назад
            </Button>
        }
        >
        <RoleForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}