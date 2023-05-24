import React, { ReactNode, useCallback, useState } from "react";
import AuthLayout from "./AuthLayout";
import AuthLoginForm from "./AuthLoginForm";

interface AuthFormWrapperProps{
    readonly submit: (value: any) => void;
}

export default function AuthFormWrapper({submit}:AuthFormWrapperProps){

    const [initialValues, setInitialValues] = useState({ email: "", password: "" });
    
    
    return (
        <AuthLayout>
            <AuthLoginForm initialValues={initialValues} setInitialValues={setInitialValues} onSubmit={submit}/>
        </AuthLayout>
    )
}