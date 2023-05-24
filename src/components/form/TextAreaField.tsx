import { useField } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import "./assets/input.scss";

interface InputFieldProps{
    readonly name: string;
    readonly id?: string;
    readonly value?: any;
    readonly label?: any;
    readonly type?: string;
    readonly required?: boolean;
    readonly onChange?: (event: any) => void;
    readonly className?: string;
    readonly inputClassName?: string;
    readonly disabled?: boolean;
    readonly placeholder?: string;
}

export default function TextAreaField({name, id, value, onChange, label, type = "text", required, className, disabled=false, inputClassName, placeholder}:InputFieldProps){
    const [field, meta] = useField(name);
    const [req, setReq] = useState<boolean>(false)
    const showError = useMemo(()=>Boolean(meta.error && meta.touched), [meta])
    const onBlur = useCallback((value: any)=>{
        if(!value.target.value){
            setReq(true)
        }else{
            setReq(false)
        }
    },[setReq])
    return (
        <div className={`textarea-container w-100 ${className}`}>
            {label &&(
                <label className="w-100" htmlFor={id}>{label}</label>
            )}
            <textarea disabled={disabled} placeholder={placeholder} className={`w-100 ${(showError && req)? 'show-error':''} ${inputClassName}`} id={id} name={name} required={required} value={value} onChange={onChange} onBlur={onBlur}/>
            {(showError && req) && (
                <span className="text-danger req-title">Required</span>
            )}
        </div>
    )
}