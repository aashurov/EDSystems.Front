import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import BranchForm from "./BranchForm";
import { useBranchApiContext } from "../../api/branch/BranchApiContext";

interface BranchFormWrapperProps{
    readonly back: () => void
}

export default function BranchFormWrapper({back}:BranchFormWrapperProps){

    const { BranchApi } = useBranchApiContext();

    const [search, setSearch] = useSearchParams();

    const id = useMemo(()=>search.get("branchId"),[search])


    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        city: "",
        country: "",
        phone: "",
        address: "",
        code: "",
    })

    useEffect(()=>{
        if(id){
            BranchApi.getBranchById({id: Number(id)}).then((response: any)=>setInitialValues(response.data)).catch((err: any)=>toast.error(err.message))
        }
    },[setInitialValues, id, BranchApi])

    const submit = useCallback((value: any)=>{
       if(id){
        const data = {
            ...value,
            id: id
        }
        BranchApi.updateBranch(data).then(()=>{
                toast.success("Updated!")
            }).catch(()=>toast.error("Fail!"))
       }else{
        const data = {
            ...value,
        }
        BranchApi.createBranch(data).then(()=>{
                toast.success("Added!")
            }).catch(()=>toast.error("Fail!"))
            }
    },[BranchApi, toast])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4"
        headerComponent={
            <Button onClick={back} className="bg-gold text-light mb-2 px-2 py-1">
                Назад
            </Button>
        }
        >
        <BranchForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}