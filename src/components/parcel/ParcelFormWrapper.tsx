import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import AddParcelForm from "./ParcelForm";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import TabPage from "../tabs/TabPage";

const labeValue: SelectType = {
    label: "",
    value: ""
}

const defaultValues = {
    code: 0,
        senderId: labeValue,
        recipientId: labeValue,
        parcelBranchFromId: labeValue,
        parcelBranchToId: labeValue,
        weight: 0,
        images: [],
        description: "",
        pickupAddress: "",
        deliveryAddress: "",
        numberOfPoint: 0,
        parcelPlanId: labeValue,
        parcelStatusId: labeValue,
        costDeliveryToBranch: 0,
        costDeliveryToPoint: 0,
        costPickingUp: 0,
        paymentMethod: labeValue,
        senderCourierId: labeValue,
        recipientCourierId: labeValue   ,
        StateDeliveryToBranch: false,
        StatePickingUp: false,
        StateDeliveryToPoint: false,
        StateSenderCourierId: false,
        StateRecipientCourierId: false,
        sendSmsToRecipient: false,
        sendSmsToSender: false,
        sendSmsToTelegram: false,
}

interface SelectType{
    readonly label: string;
    readonly value: string;
}



export default function AddParcelFormWrapper(){
    
    const [initialValues, setInitialValues] = useState({
        code: 0,
        senderId: labeValue,
        recipientId: labeValue,
        parcelBranchFromId: labeValue,
        parcelBranchToId: labeValue,
        weight: 0,
        images: [],
        description: "",
        pickupAddress: "",
        deliveryAddress: "",
        numberOfPoint: 0,
        parcelPlanId: labeValue,
        parcelStatusId: labeValue,
        costDeliveryToBranch: 0,
        costDeliveryToPoint: 0,
        costPickingUp: 0,
        paymentMethod: labeValue,
        senderCourierId: labeValue,
        recipientCourierId: labeValue   ,
        StateDeliveryToBranch: false,
        StatePickingUp: false,
        StateDeliveryToPoint: false,
        StateSenderCourierId: false,
        StateRecipientCourierId: false,
        sendSmsToRecipient: false,
        sendSmsToSender: false,
        sendSmsToTelegram: false,
    })
    const [senders, setSenders] = useState<any[]>([])
    const [receipents, setReceipents] = useState<any[]>([])
    const [branches, setBranches] = useState<any>([]);
    const [costInfoList, setCostInfoList] = useState<any>([]);
    const [plans, setPlans] = useState<any>([]);
    const [couriers, setCouriers] = useState<any>([]);
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [parcelStatuses, setParcelStatus] = useState<any[]>([]);
    const [search, setSearch] = useSearchParams();
    const navigator = useNavigate();

    const parcelId = useMemo(()=>search.get("parcelId")?search.get("parcelId"): "",[search])
    const profile = useSelector((state: any)=>state.data.profile)

    useEffect(()=>{
        request.get('/Parcel/GetInfoParcel',{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{

            respon.data.plan.plans.map((item: any)=>{
                const data = {
                    label: item.name,
                    value: item.id
            }
            setPlans((user: any)=>[...user, data])
            })

            respon.data.branch.branches.map((item: any)=>{
                const data = {
                    label: item.name,
                    value: item.id
            }
            setBranches((user: any)=>[...user, data])
            })  

            setCostInfoList(respon.data.costInfoList)
            
        }).catch((error)=>console.log(error.message))
        
    },[request, setCostInfoList, setBranches, setPlans]) 
    
    useEffect(()=>{
        request.get(`/UserManager/GetUserList?RoleId=4`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{
            respon.data.customers.map((item: any)=>{
                const data = {
                    label: `${item.firstName} ${item.lastName} ${item.phone}`,
                    value: item.id
                }
                setCouriers((prev: any)=>[...prev, data])
            })
        }).catch((error)=>toast.error(error.message))
        
    },[request, toast, setCouriers])

    useEffect(()=>{
        request.get(`/PaymentMethod/GetPaymentMethodList`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{
            respon.data.paymentMethods.map((item: any)=>{
                const data = {
                    label: item.name,
                    value: item.id
                }
                setPaymentMethods((prev: any)=>[...prev, data])
            })
        }).catch((error)=>toast.error(error.message))
        
    },[request, toast, setPaymentMethods]);

    useEffect(()=>{
        request.get(`/Status/GetStatusList`,{
          headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
        }).then((respon: any)=>{
            console.log(respon)
            respon.data.statuses.map((item: any)=>{
                const data = {
                    label: item.name,
                    value: item.id
                }
                setParcelStatus((prev: any)=>[...prev, data])
            })
        }).catch((error)=>toast.error(error.message))
        
    },[request, toast, setParcelStatus]);


    const getSendersBySearching = useCallback((value: string)=>{
        if(value != ""){
            request.get(`/UserManager/SearchUserWithSkip?searchText=${value}&Skip=${0}&Top=${20}`,{
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
              }).then((respon: any)=>{
                  let array: any = []
                  respon.data.customers.map((item: any)=>{
                      const data = {
                          label: `${item.firstName} ${item.lastName} ${item.phone}`,
                          value: item.id
                      }
                      array.push(data);
                  })
                  setSenders(array)
              }).catch((error)=>{
                toast.error(error.message)})
        }
    },[request, setSenders, toast])

    const getReceipentsBySearching = useCallback((value: string)=>{
        if(value != ""){
            request.get(`/UserManager/SearchUserWithSkip?searchText=${value}&Skip=${0}&Top=${20}`,{
                headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`} 
              }).then((respon: any)=>{
                  let array: any = []
                  respon.data.customers.map((item: any)=>{
                      const data = {
                          label: `${item.firstName} ${item.lastName} ${item.phone}`,
                          value: item.id
                      }
                      array.push(data);
                  })
                  setReceipents(array)
              }).catch((error)=>{
                toast.error(error.message)})
        }
    },[request, setReceipents, toast])

    useEffect(()=>{
        if(parcelId !== ""){
            request.get(`/Parcel/GetParcelDetailsById/${parcelId}`).then((response)=>{
                const parcelStatusInResponse = response.data.parcelStatus.filter((item: any)=>item.isCurrent)[0]; 
                const value = response.data
                const data: any = {
                    ...value,
                    id: value.id,
                    code: value.code,
                    senderId: {
                        label: value.sender.firstName + " " + value.sender.lastName + " " + value.sender.phoneNumber,
                        value: value.sender.id
                    },
                    recipientId: {
                        label: value.recipient.firstName + " " + value.recipient.lastName + " " + value.recipient.phoneNumber,
                        value: value.recipient.id
                    },
                    parcelBranchFromId: {
                        label: value.fromBranch.name,
                        value: value.fromBranch.id
                    },
                    parcelBranchToId: {
                        label: value.toBranch.name,
                        value: value.toBranch.id
                    },
                    weight: value.parcelSize.weight,
                    images: value.parcelImage,
                    description: value.parcelDescription.description,
                    pickupAddress: value.parcelAddress.pickingUpAddress,
                    deliveryAddress: value.parcelAddress.deliveryUpAddress,
                    numberOfPoint: value.parcelSize.numberOfPoint,
                    parcelPlanId: {
                        label: value.parcelPlan.name,
                        value: value.parcelPlan.id
                    },
                    parcelStatusId: {
                        label: parcelStatusInResponse.status.name,
                        value: parcelStatusInResponse.status.id
                    },
                    costDeliveryToBranch: value.parcelCost.costDeliveryToBranch,
                    costDeliveryToPoint: value.parcelCost.costDeliveryToPoint,
                    costPickingUp: value.parcelCost.costPickingUp,
                    paymentMethod: paymentMethods && paymentMethods.filter((item)=>item.value === value.parcelCost.paymentMethodId)[0],
                    senderCourierId: value.senderCourier?  {
                        label: value.senderCourier?.firstName + " " + value.senderCourier?.lastName + " " + value.senderCourier?.phoneNumber,
                        value: value.senderCourier?.id
                    }: labeValue,
                    recipientCourierId: value.recipientCourier?{
                         label: value.recipientCourier?.firstName + " " + value.recipientCourier?.lastName + " " + value.recipientCourier?.phoneNumber,
                        value: value.recipientCourier?.id
                    }: labeValue,
                    StateDeliveryToBranch: value.parcelCost.stateDeliveryToBranch,
                    StatePickingUp: value.parcelCost.StatePickingUp,
                    StateDeliveryToPoint: value.parcelCost.StateDeliveryToPoint,
                    StateSenderCourierId: false,
                    StateRecipientCourierId: false,
                }
                 setInitialValues(data)
            }).catch((error)=>console.log(error))
        }else if(!parcelId){
            setInitialValues(defaultValues);
        }
    },[request, parcelId, setInitialValues, paymentMethods, defaultValues])

    // console.log(initialValues)

    const onSumbit = useCallback((value: any)=>{
        if(parcelId !== ""){
            const data = {
                ...value,
                code: value.code,
                parcelCost: {
                    StateDeliveryToBranch: value.StateDeliveryToBranch,
                    StatePickingUp: value.StatePickingUp,
                    StateDeliveryToPoint: value.StateDeliveryToPoint,
                    costPickingUp: Number(value.costPickingUp),
                    costDeliveryToPoint: Number(value.costDeliveryToPoint),
                    costDeliveryToBranch: Number(value.costDeliveryToBranch),
                    currencyId: 1,
                    paymentMethodId: value.paymentMethod.value,
                },
                senderId: Number(value.senderId.value),
                recipientId: Number(value.recipientId.value),
                senderStaffId: Number(profile.id),
                recipientCourierId: Number(value.recipientCourierId.value),
                senderCourierId: Number(value.senderCourierId.value),
                parcelPlanId: Number(value.parcelPlanId.value),
                parcelBranchFromId: Number(value.parcelBranchFromId.value),
                parcelBranchToId: Number(value.parcelBranchToId.value),
                parcelSize: {
                    weight: Number(value.weight),
                    numberOfPoint: Number(value.numberOfPoint)
                },
                parcelImage: value.images, 
                parcelAddress: {
                    pickingUpAddress: value.pickupAddress,
                    deliveryAddress: value.deliveryAddress,
                },
                parcelDescription: {
                    description: value.description
                },
                sendSmsToRecipient: value.sendSmsToRecipient,
                sendSmsToSender: value.sendSmsToSender,
                sendSmsToTelegram: value.sendSmsToTelegram,
            }
            request.put("/Parcel/UpdateParcel", data ,{
                    headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
                }).then(()=>{
                    toast.success("Посылка успешно обновлена!")
                    navigator('/app/parcels/all-parcels')
                }).catch((err: any)=>toast.error(err.message))
        }else{
            if(value.paymentMethod.value === ""){
                toast.warning("Выберите метод платежа!")
            }else {
            const data = {
                code: value.code,
                parcelCost: {
                    StateDeliveryToBranch: value.StateDeliveryToBranch,
                    StatePickingUp: value.StatePickingUp,
                    StateDeliveryToPoint: value.StateDeliveryToPoint,
                    costPickingUp: Number(value.costPickingUp),
                    costDeliveryToPoint: Number(value.costDeliveryToPoint),
                    costDeliveryToBranch: Number(value.costDeliveryToBranch),
                    currencyId: 1,
                    paymentMethodId: value.paymentMethod.value,
                },
                senderId: Number(value.senderId.value),
                recipientId: Number(value.recipientId.value),
                senderStaffId: Number(profile.id),
                recipientCourierId: Number(value.recipientCourierId.value),
                senderCourierId: Number(value.senderCourierId.value),
                parcelPlanId: Number(value.parcelPlanId.value),
                parcelBranchFromId: Number(value.parcelBranchFromId.value),
                parcelBranchToId: Number(value.parcelBranchToId.value),
                parcelSize: {
                    weight: Number(value.weight),
                    numberOfPoint: Number(value.numberOfPoint)
                },
                parcelImage: value.images, 
                parcelAddress: {
                    pickingUpAddress: value.pickupAddress,
                    deliveryAddress: value.deliveryAddress,
                },
                parcelDescription: {
                    description: value.description
                },
                sendSmsToRecipient: value.sendSmsToRecipient,
                sendSmsToSender: value.sendSmsToSender,
                sendSmsToTelegram: value.sendSmsToTelegram,
            }
            request.post("/Parcel/Createparcel", data ,{
                    headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
                }).then(()=>{
                    toast.success("Посылка успешно добавлена!")
                    navigator('/app/parcels/all-parcels')
                }).catch((err: any)=>toast.error(err.message))
            }
        }
    },[request, toast, profile, navigator])

    const onPrint = useCallback((value: any)=>{
        const myArray: boolean[] = [];
        let myString: boolean = false;
        if(value.StateDeliveryToBranch && value.StateDeliveryToPoint && value.StatePickingUp){
            myArray.push(true);
        }else{
            myArray.push(false);
        }

        if(value.StateDeliveryToPoint){
            myString = true 
        }

        const data = {
            barCodeNumber: value.code,
            promted: Number(value.numberOfPoint),
            dateTime: "2023-05-03T10:26:33.271Z",
            myArray: myArray,
            myString: myString
        }

        request.post('/File/GetSticker',
        data,
         {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            },
            responseType: 'blob',
        }).then((response) => {
            const href = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${value.code}.pdf`);
            document.body.appendChild(link);
            link.click();
        
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });

    },[request, localStorage])
    
    return (
        <TabPage
            childrenClassName="p-2"
            >
         <AddParcelForm 
                senders={senders}
                recipients={receipents}
                paymentMethods={paymentMethods} 
                statuses={parcelStatuses}
                customers={couriers} 
                initialValues={initialValues} 
                setInitialValues={setInitialValues} 
                plans={plans} 
                branchs={branches} 
                costInfo={costInfoList}
                setRundomCode={(value:any)=>onPrint(value)}
                onSubmit={(value)=>onSumbit(value)}
                searchSender={(value: string) => getSendersBySearching(value)}
                searchReceipent={(value: string) => getReceipentsBySearching(value)}
                />
          </TabPage>
     )
}