import React, {useCallback} from "react";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";

interface UserManagerFormProps{
    readonly initialValues: any;
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    firstName: string().required("Required!"),
    lastName: string().required("Required!"),
    userName: string().required("Required!"),
    phoneNumber: string().required("Required!"),
    address: string().required("Required!"),
})

export default function UserManagerEditForm({initialValues, setInitialValues, submit}:UserManagerFormProps){

    const onChangeFirstName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            firstName: value.target.value
        }))
    },[setInitialValues])

    const onChangeLastName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            lastName: value.target.value
        }))
    },[setInitialValues])

    const onChangePhoneNumber = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            phoneNumber: value.target.value
        }))
    },[setInitialValues])

    const onChangeUserName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            userName: value.target.value
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
                        <div className="col-4">
                        </div>
                        <div className="col-8">
                        <GroupBox title="ИНформация о пользователе">
                           <div className="row">
                            <div className="col-6 my-1">
                            <InputField
                                label="Имя"
                                name="firstName"
                                value={initialValues.firstName}
                                onChange={(event: any)=>onChangeFirstName(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Фамилия"
                                name="lastName"
                                value={initialValues.lastName}
                                onChange={(event: any)=>onChangeLastName(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Имя пользователя (ник)"
                                name="userName"
                                value={initialValues.userName}
                                onChange={(event: any)=>onChangeUserName(event)}
                                />
                            </div>
                            <div className="col-6 my-1">
                            <InputField
                                label="Контакт"
                                name="phoneNumber"
                                value={initialValues.phoneNumber}
                                onChange={(event: any)=>onChangePhoneNumber(event)}
                                />
                            </div>
                            <div className="col-12 my-1">
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
                        <div className="col-12 mt-3 d-flex justify-content-end">
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