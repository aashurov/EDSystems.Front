import { useEffect, useState, useCallback } from "react";
import TabPage from "../tabs/TabPage";
import EditParcelStatusForm from "./EditParcelStatusForm";
import { useStatusApiContext } from "../../api/status/StatusApiContext";
import { useUserApiContext } from "../../api/user/UserApiContext";
import { request } from "../../api/request";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultValues ={
    parcelCode: [],
    searchText: "",
    sendSmsToRecipient: false, 
    sendSmsToSender: false, 
    sendSmsToTelegram: false, 
    statusId: "",
    recipientCourierId: ""
}

export default function EditParcelStatusFormWrapper(){

    const [statuses, setStatuses] = useState<any[]>([]);
    const [curiers, setCuriers] = useState<any[]>([]);
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
        parcelCode: [],
        searchText: "",
        sendSmsToRecipient: false, 
        sendSmsToSender: false, 
        sendSmsToTelegram: false, 
        statusId: "",
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

        const data = {
            statusId: value.statusId.value,
            recipientCourierId: value.recipientCourierId.value,
            parcelCode: array,
            sendSmsToRecipient: value.sendSmsToRecipient, 
            sendSmsToSender: value.sendSmsToSender, 
            sendSmsToTelegram: value.sendSmsToTelegram,
        }
        request.post(`/Parcel/UpdateParcelsStatusByCode`, 
        data
        ).then((response: any)=>{
            navigate('/app/parcels')
            toast.success(response.message);
            setInitialValues(defaultValues)
        })
        .catch((error: any)=>console.log(error))
    },[request, defaultValues, setInitialValues])

    return (
        <TabPage
            childrenClassName="p-4"
            >
            <EditParcelStatusForm
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                statuses={statuses}
                curiers={curiers}
                onSubmit={(value)=>sendStatus(value)}
                />
        </TabPage>
    )
}