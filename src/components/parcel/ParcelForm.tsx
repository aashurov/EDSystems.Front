import { Form, Formik } from "formik";
import { update } from "immupdate";
import { useCallback, useState } from "react";
import { bool, mixed, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputGroup from "../app/InputGroup";
import Button from "../button/Button";
import CheckBox from "../form/CheckBox";
import InputField from "../form/InputField";
import { toast } from "react-toastify";
import ImgUpload from "../app/ImgUpload";
import AddParcelShowImages from "./ParcelShowImages";
import TextAreaField from "../form/TextAreaField";
import SelectPickerField from "../form/SelectPickerField";

export interface SelectType{
    label: string;
    value: string;
}

const validationSchema = object({
    senderId: mixed<SelectType>(),
    recipientId: mixed<SelectType>(),
    parcelBranchFromId: mixed<SelectType>(),
    parcelBranchToId: mixed<SelectType>(),
    weight: string(),
    numberOfPoint: string(),
    parcelPlanId: mixed<SelectType>(),
    costDeliveryToBranch: string(),
    costDeliveryToPoint: string(),
    costPickingUp: string(),
   // paymentMethods: mixed<SelectType>(), //.required("Required!"),
    senderCourierId: mixed<SelectType>(),
    recipientCourierId: mixed<SelectType>(),
    StateDeliveryToBranch: bool(),
    StatePickingUp: bool(),
    StateDeliveryToPoint: bool(),
})

interface AddParcelFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly senders: any[];
    readonly recipients: any[];
    readonly plans: any[];
    readonly statuses: any[];
    readonly customers: any[];
    readonly branchs: any[];
    readonly costInfo: any[];
    readonly paymentMethod: any[];
    readonly setRundomCode: (value: any) => void;
    readonly onSubmit: (value: any) => void;
    readonly searchSender: (value: string) => void;
    readonly searchReceipent: (value: string) => void;
}

export default function AddParcelForm({
    initialValues, 
    recipients,
    senders, 
    costInfo, 
    branchs, 
    plans, 
    statuses, 
    customers, 
    paymentMethod, 
    setInitialValues,
    setRundomCode,
    onSubmit,
    searchSender,
    searchReceipent
}:AddParcelFormProps){

    const onChangeSenderId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                senderId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    const onChangeRecipientId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                recipientId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    const onChangePaymentMethod = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                paymentMethods: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    const onChangeParcelBranchFromId = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === value.label && x.toBranch === initialValues.parcelBranchToId.label && x.planName === initialValues.parcelPlanId.label))];
        let WEIGHT, OVERAL_SUM: Number = 0;
        
        if(found && found.commonCost !== 0){

            WEIGHT = initialValues.weight < found.minimumWeight ? found.minimumWeight : initialValues.weight;

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }
        }

        setInitialValues((prev: any)=>
            update(prev, {
                parcelBranchFromId: {
                    label: value.label,
                    value: value.value
                },
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeParcelBranchToId = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId.label && x.toBranch === value.label && x.planName === initialValues.parcelPlanId.label))];
        let WEIGHT, OVERAL_SUM: Number = 0;

        if(found && found.commonCost !== 0){
            
            WEIGHT = initialValues.weight < found.minimumWeight ? found.minimumWeight : initialValues.weight;

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }
        }

        setInitialValues((prev: any)=>
            update(prev, {
                parcelBranchToId: {
                    label: value.label,
                    value: value.value
                },
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeWeight = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId.label && x.toBranch === initialValues.parcelBranchToId.label && x.planName === initialValues.parcelPlanId.label))];
        let WEIGHT, OVERAL_SUM: Number = 0;
        
        if(found && found.commonCost !== 0 && value){
            
            console.log("Salom")

            WEIGHT = Number(value) < found.minimumWeight ? found.minimumWeight : Number(value);

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }
        }

        setInitialValues((prev: any)=>
            update(prev, {
                weight: value,
                costDeliveryToBranch: OVERAL_SUM,
            })
        )
    },[setInitialValues, initialValues, costInfo])

    const onChangeNumberOfPoint = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                numberOfPoint: value,
            })
        )
    },[setInitialValues])
    

    const onChangeParcelStatusId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                parcelStatusId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    const onChangeParcelPlanId = useCallback((value: any)=>{

        const found = costInfo[costInfo.findIndex(x =>(x.fromBranch === initialValues.parcelBranchFromId.label && x.toBranch === initialValues.parcelBranchToId.label && x.planName === value.label))];
        let WEIGHT, OVERAL_SUM: Number = 0;

        if(found && found.commonCost !== 0){

            WEIGHT = initialValues.weight < found.minimumWeight ? found.minimumWeight : initialValues.weight;

            if(found.firstCost === 0){
                OVERAL_SUM = WEIGHT * found.commonCost
            }else if(found.firstCost !== 0){
                OVERAL_SUM = found.firstCost + found.commonCost*(WEIGHT - 1);
            }

                setInitialValues((prev: any)=>
                    update(prev, {
                        code: Math.floor(Math.random() * (899999999 + 1) + 100000000)
                    })
                );

        }else if(found && found.commonCost === 0){
            toast.warn(found.message)
        }
        else{
            toast.error("Такое направление не существует!")
        }
        
        setInitialValues((prev: any)=>
            update(prev, {
                parcelPlanId: {
                    label: value.label,
                    value: value.value
                },
                costDeliveryToBranch: OVERAL_SUM,
            })
        );
        
    },[setInitialValues, initialValues, costInfo])


    const onChangeCostDeliveryToBranch = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                costDeliveryToBranch: value.target.value
            })
        )
    },[setInitialValues])

    const onChangeCostDeliveryToPoint = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                costDeliveryToPoint: value.target.value
            })
        )
    },[setInitialValues])

    const onChangeCostPickingUp = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                costPickingUp: value.target.value
            })
        )
    },[setInitialValues])
    
    
    const onChangeStateDeliveryToBranch = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StateDeliveryToBranch: value
            })
        )
    },[setInitialValues])


    const onChangeSenderCourierId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                senderCourierId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    const onChangeRecipientCourierId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                recipientCourierId: {
                    label: value.label,
                    value: value.value
                }
            })
        )
    },[setInitialValues])

    // ====== Checkbox ===== //

    const onChangeStatePickingUp = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StatePickingUp: value
            })
        )
    },[setInitialValues])
    
    const onChangeStateDeliveryToPoint = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StateDeliveryToPoint: value
            })
        )
    },[setInitialValues])
 
    const onChangeStateSenderCourierId = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                StateSenderCourierId: value
            })
        )
    },[setInitialValues])

    const onChangeSendSmsToRecipient = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                sendSmsToRecipient: value
            })
        )
    },[setInitialValues])

    const onChangeSendSmsToSender = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                sendSmsToSender: value
            })
        )
    },[setInitialValues])

    const onChangeSendSmsToTelegram = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                sendSmsToTelegram: value
            })
        )
    },[setInitialValues])

    // ==== Textarea ==== //

    const onChangeDescription = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                description: value.target.value
            })
        )
    },[setInitialValues])

    const onChangePickupAddress = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                pickupAddress: value.target.value
            })
        )
    },[setInitialValues])

    const onChangeDeliveryAddress = useCallback((value: any)=>{
        setInitialValues((prev: any)=>
            update(prev, {
                deliveryAddress: value.target.value
            })
        )
    },[setInitialValues])

    // ==== Image ==== //

    const onChangeImage = useCallback((value: any)=>{

        let arr: any = [...initialValues.images];

        for(let i = 0; i<value.target.files.length; i++){
            const reader = new FileReader();

            reader.onloadend = ( ) => {
                const data = {
                    imageBytes: reader.result?.toString(),
                    imageName: "",
                }
                arr.push(data);
                setInitialValues((prev: any)=>
                update(prev, {
                    images: arr,
                }))
            }

            reader.readAsDataURL(value.target.files[i]);
        }
        
    },[setInitialValues, initialValues])

    const deleteImage = useCallback((value: number)=>{
        const images = [...initialValues.images]
        images.splice(value, 1)
        setInitialValues((prev: any)=>
        update(prev, {
            images: images,
        }))
    },[setInitialValues, initialValues.images])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={()=>onSubmit(initialValues)}
            enableReinitialize={true}
            validationSchema={validationSchema}>
                {()=>(<Form>
                    <div className="row p-3 mt-3">
                        <div className="col-12 mb-3 d-flex justify-content-between align-item-center">
                            <div className="d-flex gap-2 align-item-center">
                                <span>Нова посылка</span><span> { initialValues.code} </span>
                            </div>
                        </div>
                        
                        <div className="col-6">
                            <GroupBox title="Отправитель">
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <label htmlFor="senderId">ФИО отправителя</label>
                                    <SelectPickerField
                                            name="senderId" 
                                            options={senders} 
                                            onChanges={(value)=>onChangeSenderId(value)}
                                             id="senderId"
                                            isSearchable
                                            onInputChange={(value)=>searchSender(value)}
                                            />
                                        </div>
                                    <div className="col-12 mt-2">
                                    <label htmlFor="parcelBranchFromId">Откуда</label>
                                        <SelectPickerField 
                                            name="parcelBranchFromId" 
                                            options={branchs} 
                                            onChanges={(value: any)=>onChangeParcelBranchFromId(value)} 
                                            label=""/>
                                    </div>
                                 </div>
                             </GroupBox>
                        </div>
                        
                        <div className="col-6">
                            <GroupBox title="Получатель">
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <SelectPickerField 
                                            isSearchable={true}
                                            name="recipientId" 
                                            options={recipients} 
                                            onChanges={(value)=>onChangeRecipientId(value)}
                                            label="ФИО получателя"
                                            onInputChange={(value)=>searchReceipent(value)}
                                            />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <SelectPickerField 
                                            name="parcelBranchToId" 
                                            options={branchs} 
                                            onChanges={(value: any)=>onChangeParcelBranchToId(value)} 
                                            label="Куда"/>                                    
                                    </div>
                                </div>
                             </GroupBox>
                        </div>

                        {/* {Boolean(parcelId)?(This will be Update ):(This will be create)} */}
                        
                        <div className="col-12 mt-4">
                            <GroupBox>
                                <div className="row">
                                    <div className="col-3">
                                        <InputField 
                                            name="weight" 
                                            value={initialValues.weight} 
                                            onChange={(event: any)=>onChangeWeight(event.target.value)} 
                                            type="number" 
                                            label="Вес"/>
                                    </div>
                                    <div className="col-3">
                                        <InputField 
                                            name="numberOfPoint" 
                                            value={initialValues.numberOfPoint} 
                                            onChange={(event: any)=>onChangeNumberOfPoint(event.target.value)} 
                                            type="number" label="Количество мест в посылке"/>
                                    </div>
                                    <div className="col-3">
                                        <SelectPickerField 
                                            name="parcelPlanId" 
                                            onChanges={(value: any)=>onChangeParcelPlanId(value)}  
                                            options={plans} 
                                            label="Тариф"/>
                                    </div>

    {initialValues.id && (
        <div className="col-3">
        <SelectPickerField 
            name="parcelStatusId" 
            onChanges={(value: any)=>onChangeParcelStatusId(value)}  
            options={statuses} 
            label="Статус"/>
       </div>
    )
}
                                 
                                
                                
                                </div>
                            </GroupBox>
                        </div>
                        
                        <div className="col-12 mt-4">
                            <GroupBox title="Стоимость услуги">
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <InputGroup label="Стоимость перевозки до филиала">
                                            <InputField 
                                            width={500}
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"Стоимость перевозки оплачен?"} 
                                                name="costDeliveryToBranchCheck"/>

                                            <CheckBox 
                                                onChange={(event)=>onChangeStateDeliveryToBranch(event)} 
                                                value={initialValues.StateDeliveryToBranch} 
                                                name="StateDeliveryToBranch"
                                                />
                                            <InputField 
                                                value={initialValues.costDeliveryToBranch} 
                                                type="number" 
                                                onChange={(event: any)=>onChangeCostDeliveryToBranch(event)}  
                                                inputClassName="rounded-0 border-0 h-100" 
                                                name="costDeliveryToBranch"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6">
                                         <InputGroup label="Стоимость доставки до двери">
                                            <InputField 
                                            width={500}
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"Стоимость доставки оплачен?"} 
                                                name="costDeliveryToPointCheck"/>
                                            <CheckBox 
                                                onChange={(event)=>onChangeStateDeliveryToPoint(event)} 
                                                value={initialValues.StateDeliveryToPoint} 
                                                name="StateDeliveryToPoint"/>
                                            <InputField 
                                                type="number" 
                                                value={initialValues.costDeliveryToPoint} 
                                                onChange={(event: any)=>onChangeCostDeliveryToPoint(event)} 
                                                inputClassName="rounded-0 border-0 h-100" 
                                                name="costDeliveryToPoint"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Стоимость забора">
                                            <InputField 
                                            width={500}
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"С курьером рассчитан?"} 
                                                name="someName"/>
                                            <CheckBox 
                                                onChange={(event)=>onChangeStatePickingUp(event)} 
                                                value={initialValues.StatePickingUp} 
                                                name="StatePickingUp"/>
                                            <InputField  
                                                value={initialValues.costPickingUp} 
                                                onChange={(event: any)=>onChangeCostPickingUp(event)} 
                                                type="number" 
                                                inputClassName="rounded-0 border-0 h-100" 
                                                name="costPickingUp"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <SelectPickerField 
                                            options={paymentMethod} 
                                            onChanges={(value: any)=>onChangePaymentMethod(value)}
                                            name="paymentMethod" 
                                            label="Метод оплаты"/>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>

                        <div className="col-12 mt-4">
                            <GroupBox title="Забор и доставка посылок">
                                <div className="row mt-2">
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Курьер для забора посылки">
                                            <InputField 
                                            width={500}
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"С курьером рассчитан?"} 
                                                name="someName100"/>
                                            <CheckBox 
                                                onChange={(value: boolean)=>onChangeStateSenderCourierId(value)}
                                                value={initialValues.StateSenderCourierId}
                                                name="StateSenderCourierId"/>
                                            <SelectPickerField 
                                                className="w-100"
                                                options={customers} 
                                                onChanges={(value)=>onChangeSenderCourierId(value)} 
                                                name="senderCourierId"/>
                                        </InputGroup>
                                    </div>
                                    <div className="col-6 mt-3">
                                        <InputGroup label="Курьер для доставки посылки">
                                            <InputField 
                                            width={500}
                                                disabled 
                                                inputClassName="border-0" 
                                                value={"С курьером рассчитан?"} 
                                                name="SomaNema213"/>
                                            <CheckBox 
                                                onChange={()=>console.log("Asadbek")} 
                                                name="Asadbek"/>
                                            <SelectPickerField 
                                                className="w-100"
                                                options={customers}     
                                                onChanges={(value)=>onChangeRecipientCourierId(value)} 
                                                name="recipientCourierId"/>
                                        </InputGroup>
                                    </div>
                                </div>
                            </GroupBox>
                        </div>



                <div className="col-12 mt-3">
                        <ImgUpload 
                            className="mb-3" 
                            setImage={(value: any)=>onChangeImage(value)}/>
                        <AddParcelShowImages 
                            data={initialValues.images}
                            deleteImage={(value)=>deleteImage(value)}
                            />
                </div>

                <div className="col-12 mt-3">
                    <GroupBox title="Оповещение">
                        <div className="row">
                            <div className="col-4 d-flex">
                                <CheckBox 
                                    onChange={(value: boolean)=>onChangeSendSmsToTelegram(value)} 
                                    value={initialValues.sendSmsToTelegram}
                                    checkboxClassName="me-2"
                                    className="bg-transparent w-100" 
                                    name="sendSmsToTelegram" 
                                    rightLabel="Telegram"/>
                            </div>
                            <div className="col-4">
                                <CheckBox 
                                checkboxClassName="me-2"
                                    onChange={(value: boolean)=>onChangeSendSmsToSender(value)} 
                                    value={initialValues.sendSmsToSender}
                                    className="bg-transparent w-100" 
                                    name="sendSmsToSender" 
                                    rightLabel="СМС отправителю"/>
                            </div>
 

                            <div className="col-4 d-flex">
                                <CheckBox 
                                    onChange={(value: boolean)=>onChangeSendSmsToRecipient(value)}
                                    value={initialValues.sendSmsToRecipient} 
                                    checkboxClassName="me-2"
                                    className="bg-transparent w-100" 
                                    name="sendSmsToRecipient" 
                                    rightLabel="СМС получателю"/>
                            </div>
                        </div>
                    </GroupBox>
                </div>

                <div className="col-12 mt-4">
                        <GroupBox title="Адреса доставки и забора посылки">
                            <div className="row">
                                <div className="col-12 mt-2">
                                    <TextAreaField 
                                        label="Описание посылки" 
                                        name="description"
                                        value={initialValues.description}
                                        onChange={(value: any)=>onChangeDescription(value)}
                                        />
                                </div>
                                <div className="col-12 mt-2">
                                    <TextAreaField 
                                        label="Адрес для забора посылки" 
                                        name="pickupAddress"
                                        value={initialValues.pickupAddress}
                                        onChange={(value: any)=>onChangePickupAddress(value)}
                                        />
                                </div>
                                <div className="col-12 mt-2">
                                    <TextAreaField 
                                        label="Адрес для доставки до двери посылки" 
                                        name="deliveryAddress"
                                        value={initialValues.deliveryAddress}
                                        onChange={(value: any)=>onChangeDeliveryAddress(value)}
                                        />
                                </div>
                            </div>
                        </GroupBox>
                    </div>
                    <div className="col-12 mt-3 d-flex gap-3">
                        <Button 
                            className="bg-gold text-light px-3 py-1" 
                            type="submit">
                            Сохранить
                        </Button>

                        <Button 
                            className="text-light bg-green px-3 py-1" 
                            onClick={() => {
                                if(initialValues.code != 0 && initialValues.numberOfPoint != 0){
                                    setRundomCode(initialValues)
                                }else{
                                    toast.error("Parcel Number or Number Of Point is Not Found")
                                }
                            }}>
                                Печать этикетки
                    </Button>
                    </div>
                </div>
            </Form>)}
        </Formik>
    )
}