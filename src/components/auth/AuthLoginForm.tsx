import { Form, Formik } from "formik";
import { update } from "immupdate";
import React, { useCallback } from "react";
import { object, string } from "yup"
import Button from "../button/Button";
import InputField from "../form/InputField";
import "./assets/form.scss";

interface AuthLoginFormProps{
    readonly initialValues: any,
    readonly setInitialValues: (value: any) => void;
    readonly onSubmit: (value: any) => void;
}

const validationSchama = object({
    email: string().email('Invalid email').required('Required'),
    password: string().required("Required!")
})

export default function AuthLoginForm({initialValues, setInitialValues, onSubmit}:AuthLoginFormProps){

    const onChangeEmail = useCallback((value: any)=>{
        setInitialValues((prev: any) => update(prev, {
            email: value.target.value
        }))
    },[setInitialValues])

    const onChangePassword = useCallback((value: any)=>{
        setInitialValues((prev: any) => update(prev, {
            password: value.target.value
        }))
    },[setInitialValues])


    return (
       <div className="auth-form" style={{width: '500px'}} >
        <div className="title text-center">
            <p className="fs-3 fw-bold">Вход</p>
        </div>
        <Formik
        validationSchema={validationSchama}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        >
        {()=>(
            <Form>
              <div className="row">
                <div className="col-12">
                <InputField
                    label="Email"
                    name="email"
                    value={initialValues.email}
                    onChange={(value: any)=>onChangeEmail(value)}
                    />
                </div>
                 <div className="col-12 mt-2">
                 <InputField
                    label="Пароль"
                    name="password"
                    type="password"
                    value={initialValues.password}
                    onChange={(value: any)=>onChangePassword(value)}
                    />
                 </div>
                
                    <div className="col-12 mt-3">
                    <Button type="submit" className="w-100 text-light py-2" style={{ backgroundColor: '#2e5c87'}}>
                        Отправить
                    </Button>
                    </div>
              </div>
            </Form>
        )}
       </Formik>
       </div>
    )
}