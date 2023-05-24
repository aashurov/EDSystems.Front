import React , { ReactNode, useCallback, useState } from "react"
import { useSelector } from "react-redux";
import "./assets/sidebar.scss";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import InputField from "../form/InputField";
import { update } from "immupdate";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import { useNavigate } from "react-router-dom";

const searchParcelCodeValidationSchema = object({
    parcelCode: string(),
})

interface SideBarMenuLayoutProps{
    readonly children: ReactNode;
}

export default function SideBarMenuLayout({children}:SideBarMenuLayoutProps){
    
    const [initialValues, setInitialValues] = useState({
        parcelCode: "",
    })

    const menu = useSelector((state: any)=>state.data.menuStatus)

    const navigate = useNavigate();
    
    const profile = useSelector((state: any) =>state.data.profile)

    const onChangeParcelCode = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            parcelCode: value.target.value
        }))
    },[setInitialValues])

    const submit = useCallback((value: any)=>{
        if(value.parcelCode.length === 9){
            const code = initialValues.parcelCode;
            request.get(`/Parcel/Code?Code=${code}`)
            .then((response: any)=>{
                const ID = response.data.id;
                setInitialValues((prev: any)=>update(prev, {
                    parcelCode: ""
                }))
                navigate(`/app/parcels/parcel-view?parcelId=${ID}`)
            })
            .catch((error: any)=>console.log(error))
        }else{
            toast.warning("Parcel code must be an 9-digit number")
        }
    },[request, initialValues, toast, setInitialValues])

    return (
        <div className="h-100 sidebar-menu">
            <div className="name-title d-flex justify-content-center align-items-center py-3">
                {menu != "Opened" && (
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <span className="name-title-span fs-5 fw-bold text-light">{profile.unique_name}</span>
                        <span className="text-light title-sub">{profile.sub}</span>
                        <span className="text-light">{profile.role[0]}</span>
                    </div>
                )}
            </div>
            <div className="parcel-search-input px-3 pb-2">
                <Formik
                    initialValues={initialValues}
                    validationSchema={searchParcelCodeValidationSchema}
                    onSubmit={()=>submit(initialValues)}
                    >
                    {()=>(
                        <Form>
                            <div className="row">
                                <div className="col-12">
                                    <InputField
                                        name="parcelCode"
                                        placeholder="Search Parcel By Code..."
                                        value={initialValues.parcelCode}
                                        onChange={(value: any)=>onChangeParcelCode(value)}
                                        />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {children}
        </div>
    )
}