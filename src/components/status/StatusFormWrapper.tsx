import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import StatusForm from "./StatusForm";
import { useStatusApiContext } from "../../api/status/StatusApiContext";

interface StatusFormWrapperProps{
    readonly back: () => void
}

export default function StatusFormWrapper({back}:StatusFormWrapperProps){

    const { StatusApi } = useStatusApiContext();
    const [search, setSearch] = useSearchParams();
    const id = useMemo(()=>search.get("statusId"),[search]);

    const [initialValues, setInitialValues] = useState({
        name: "",
        description: ""
    })

    useEffect(()=>{
        if(id){
            StatusApi.getStatusById({id: Number(id)}).then((response:any)=>setInitialValues(response.data)).catch((err:any)=>toast.error(err.message))
        }
    },[id, toast, setInitialValues, StatusApi])

    const submit = useCallback((value: any)=>{
        console.log(value)
       if(id){
        const data = {
            ...value,
            id: id
        }
        StatusApi.updateStatus(data).then(()=>{
                toast.success("Updated!")
                setSearch({pageType: "table"})
            }).catch(()=>toast.error("Fail!"))
       }else{
        const data = {
            ...value,
        }
        StatusApi.createStatus(data).then(()=>{
                toast.success("Added!")
                setSearch({pageType: "table"})
            }).catch(()=>toast.error("Fail!"))
            }
    },[StatusApi, setSearch, toast])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4"
        headerComponent={
            <Button onClick={back} className="bg-gold text-light mb-2 px-2 py-1">
                Назад
            </Button>
        }
        >
        <StatusForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}