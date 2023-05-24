import React, { useState, useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import PlanForm from "./PlanForm";
import { usePlanApiContext } from "../../api/plan/PlanApiContext";
import { useSearchParams } from "react-router-dom";

interface BranchFormWrapperProps{
    readonly back: () => void
}

export default function PlanFormWrapper({back}:BranchFormWrapperProps){

    const { PlanApi } = usePlanApiContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const id = useMemo(()=>searchParams.get("planId"),[searchParams]);

    const [initialValues, setInitialValues] = useState({
        name: "",
        cost: "",
        description: ""
    })

    useEffect(()=>{
        if(id){
            PlanApi.getPlanById({id: Number(id)}).then((response: any)=>setInitialValues(response.data)).catch(()=>toast.error("Faild!"))
  
        }        
    },[PlanApi, setInitialValues, toast, id])

    const submit = useCallback((value: any)=>{
        console.log('id ', id)
       if(id){
        const data = {
            ...value,
            id: id
        }
        PlanApi.updatePlan(data).then((response: any)=>{
                toast.success("Updated!")
                setSearchParams({pageType: "table"});
            }).catch((err: any)=>toast.error("Fail!"));
       }else{
        const data = {
            ...value,
            cost: Number(value.cost)
        }
        PlanApi.createPlan(data).then((response: any)=>{
                toast.success("Added!")
                setSearchParams({pageType: "table"});
            }).catch((err: any)=>toast.error("Fail!"))
            }
    },[PlanApi, toast])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4"
        headerComponent={
            <Button onClick={back} className="bg-gold text-light mb-2 px-2 py-1">
                Назад
            </Button>
        }
        >
        <PlanForm 
            initialValues={initialValues} 
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}