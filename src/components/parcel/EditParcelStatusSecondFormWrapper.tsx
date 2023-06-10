import { useEffect, useState, useCallback } from "react";
import TabPage from "../tabs/TabPage";
import { useStatusApiContext } from "../../api/status/StatusApiContext";
import { useUserApiContext } from "../../api/user/UserApiContext";
import { request } from "../../api/request";
import EditParcelStatusSecondForm from "./EditParcelStatusSecondForm";

const defaultValues = {
    parcelCode: [],
    searchText: "",
    radioButtonValue: "",
    recipientCourierId: ""
}

export default function EditParcelStatusSecondFormWrapper(){

    const [statuses, setStatuses] = useState<any[]>([]);
    const [curiers, setCuriers] = useState<any[]>([]);

    const [initialValues, setInitialValues] = useState({
        parcelCode: [],
        searchText: "",
        radioButtonValue: "",
        recipientCourierId: ""
    })

    const { StatusApi } = useStatusApiContext();
    const { UserApi } = useUserApiContext();

    useEffect(()=>{
        StatusApi.getAllStatusWithoutPagination().then((response: any)=>{
           response.data.statuses && response.data.statuses.map((status: any)=>{
            const data = {
                label: status.name,
                value: status.id
            }
            setStatuses((status: any)=>[...status, data]);
           })
        }).catch((error: any)=>console.log(error))
    },[StatusApi, setStatuses]);

    useEffect(()=>{
        UserApi.getAllUsersWithoutPagination(4).then((response: any)=>{
            response.data.customers && response.data.customers.map((curier: any)=>{
                const data = {
                    label: curier.firstName + " " + curier.lastName + " " + curier.phone,
                    value: curier.id
                }
                setCuriers((curier: any)=>[...curier, data]);
            })
        }).then((error: any) => console.log(error))
    },[UserApi, setCuriers])

    const sendStatus = useCallback((value: any)=>{
        
        const array:any = [];
        value.parcelCode && value.parcelCode.map((code: any)=>{
            array.push(Number(code.title));
        })

            // getInvoice: value.radioButtonValue === "getInvoice"? true : false, 
            // getCourierList: value.radioButtonValue === "getCourierList"? true : false, 
            // getAll: value.radioButtonValue === "getAll"? true : false

        
        if(value.radioButtonValue === "getInvoice"){
            const data = {
                code: array,
            }
            request.post(`/File/GetInvoices`, 
                data,
                {
                    responseType: "blob"
                }
                ).then((response) => {
                    const href = URL.createObjectURL(response.data);
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', `${value.code}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                    setInitialValues(defaultValues)
                })
                .catch((error: any)=>console.log(error))
        }else if(value.radioButtonValue === "getCourierList"){
            const data = {
                code: array,
                id: "10"
            }
            request.post(`/File/GetJobList`, 
            data,
            {
                responseType: "blob"
            }
            ).then((response) => {
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', `JobList.pdf`);
                document.body.appendChild(link);
                link.click();
            
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
                setInitialValues(defaultValues)
            })
            .catch((error: any)=>console.log(error))
        }
    },[request, setInitialValues, defaultValues])

    return (
        <TabPage
            childrenClassName="p-4"
            >
            <EditParcelStatusSecondForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                statuses={statuses}
                curiers={curiers}
                onSubmit={(value)=>sendStatus(value)}
                />
        </TabPage>
    )
}