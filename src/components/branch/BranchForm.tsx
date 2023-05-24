import React, {useCallback} from "react";
import { Form, Formik } from "formik"
import { object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";

interface BranchFormProps{
    readonly initialValues: any
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    name: string().required("Required!"),
    email: string().required("Required!").email("Invalid value"),
    phone: string().required("Required!"),
    code: string().required("Required!"),
    city: string().required("Required!"),
    country: string().required("Required!"),
    address: string().required("Required!"),
})

export default function BranchForm({initialValues, setInitialValues, submit}:BranchFormProps){

    const onChangeName = useCallback((value: any)=>{
            setInitialValues((prev: any)=>update(prev, {
                name: value.target.value
            }))
    },[setInitialValues])

    const onChangeEmail = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            email: value.target.value
        }))
    },[setInitialValues])

    const onChangePhone = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            phone: value.target.value
        }))
    },[setInitialValues])

    const onChangecode = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            code: value.target.value
        }))
    },[setInitialValues])

    const onChangeCity = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            city: value.target.value
        }))
    },[setInitialValues])

    const onChangeCountry = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            country: value.target.value
        }))
    },[setInitialValues])

    const onChangeAddress = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            address: value.target.value
        }))
    },[setInitialValues])


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={submit}
            >
            {()=>(
                <Form>
                    <div className="row">
                        <div className="col-6">
                        <GroupBox title="Информация о филиале">
                           <div className="row">
                            <div className="col-12">
                            <InputField
                                label="Название"
                                name="name"
                                value={initialValues.name}
                                onChange={(event: any)=>onChangeName(event)}
                                />
                            </div>
                            <div className="col-12">
                            <InputField
                                label="Email"
                                name="email"
                                value={initialValues.email}
                                onChange={(event: any)=>onChangeEmail(event)}
                                />
                            </div>
                            <div className="col-6">
                            <InputField
                                label="Котакт"
                                name="phone"
                                value={initialValues.phone}
                                onChange={(event: any)=>onChangePhone(event)}
                                />
                            </div>
                            <div className="col-6">
                            <InputField
                                label="Код"
                                name="code"
                                value={initialValues.code}
                                onChange={(event: any)=>onChangecode(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>
                        <div className="col-6">
                        <GroupBox title="Адрес">
                           <div className="row">
                            <div className="col-12">
                            <InputField
                                label="Город"
                                name="city"
                                value={initialValues.city}
                                onChange={(event: any)=>onChangeCity(event)}
                                />
                            </div>
                            <div className="col-12">
                            <InputField
                                label="Страна"
                                name="country"
                                value={initialValues.country}
                                onChange={(event: any)=>onChangeCountry(event)}
                                />
                            </div>
                            <div className="col-12">
                            <InputField
                                label="Адрес"
                                name="address"
                                value={initialValues.address}
                                onChange={(event: any)=>onChangeAddress(event)}
                                />
                            </div>
                           </div>
                        </GroupBox>
                        </div>
                        <div className="col-12 mt-3">
                            <Button type="submit" className="text-light bg-gold px-2 py-1">
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}