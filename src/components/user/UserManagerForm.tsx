import React, {useCallback, useRef} from "react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import GroupBox from "../app/GroupBox";
import InputField from "../form/InputField";
import { update } from "immupdate";
import Button from "../button/Button";
import SelectPickerField from "../form/SelectPickerField";

interface UserManagerFormProps{
    readonly initialValues: any;
    readonly roles: any;
    readonly setInitialValues: (value: any) => void;
    readonly submit: (value: any) => void;
}

const validationSchema = object({
    firstName: string().required("Required!"),
    lastName: string().required("Required!"),
    userName: string().required("Required!"),
    email: string().required("Required!"),
    phoneNumber: string().required("Required!"),
    address: string().required("Required!"),
    passwordHash: string().required("Required!"),
    // roleName: object(),
})

export default function UserManagerForm({initialValues, roles, setInitialValues, submit}:UserManagerFormProps){

    const inqFormRef = useRef<any>(null);

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

    const onChangeEmail = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            email: value.target.value
        }))
    },[setInitialValues])

    const onChangePhoneNumber = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            phoneNumber: value.target.value
        }))
    },[setInitialValues])

    //
    
    const onChangeUserName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            userName: value.target.value
        }))
    },[setInitialValues])

    const onChangeRoleName = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            roleName: value
        }))
    },[setInitialValues])

    const onChangeAddress = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            address: value.target.value
        }))
    },[setInitialValues])

    const onChangePassword = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            passwordHash: value.target.value
        }))
    },[setInitialValues])

    const onChangeClaim = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            claim: value.target.value
        }))
    },[setInitialValues])

    const inqFormRefHandler = useCallback((instance: any)=>{
        if(instance){
            inqFormRef.current = instance
        }
    },[inqFormRef])

    console.log("init ", initialValues)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={submit}
            innerRef={inqFormRefHandler}
            >
            {()=>(
                <Form>
                    <div className="row">
                        <div className="col-4">

                        </div>
                        <div className="col-8">
                        <GroupBox title="Инфомрация о пользователя">
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
                                label="Email"
                                name="email"
                                value={initialValues.email}
                                onChange={(event: any)=>onChangeEmail(event)}
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
                            <div className="col-6 my-1">
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
                        <div className="col-12 mt-5">
                            <GroupBox
                                title="Дополнительная информация"
                                >
                                    <div className="row">
                                        <div className="col-4 d-flex">
                                        <InputField
                                        label="Пароль"
                                        name="passwordHash"
                                        value={initialValues.passwordHash}
                                        onChange={(event: any)=>onChangePassword(event)}
                                         />
                                        </div>
                                        <div className="col-8 d-flex">
                                        <SelectPickerField
                                            label="Роль"
                                            name="roleName"
                                            options={roles}
                                            isMulti
                                            onChange={(event: any)=>onChangeRoleName(event)}
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