import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import TabPage from "../tabs/TabPage";
import UserManagerForm from "./UserManagerForm";
import { useUserApiContext } from "../../api/user/UserApiContext";
import { useRoleApiContext } from "../../api/role/RoleApiContext";

interface UserManagerFormWrapperProps{
    readonly back?: () => void
}

export default function UserManagerFormWrapper({back}:UserManagerFormWrapperProps){

    const { UserApi } = useUserApiContext();
    const { RoleApi } = useRoleApiContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [roles, setRoles] = useState<any>([]);

    useEffect(()=>{
        RoleApi.getRoles().then((response: any)=>{
            response.data.roles.forEach((item: any) => {
                const newRole = {
                    label: item.name,
                    value: item.id
                }
                setRoles((role: any)=>[...role, newRole])
            });
           }).catch((err: any)=>console.log(err))
    },[RoleApi, setRoles])

    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        phoneNumber: "",
        address: "",
        roleName: {
            label: "",
            value: ""
        },
        passwordHash: "",
        claim: ""
    })
    const submit = useCallback((value: any)=>{
        const data = {
            ...value,
        roleName: value.roleName.map((item: any)=>item.label)
        }
        UserApi.createUser(data).then(()=>{
                toast.success("Добавлено!")
                setSearchParams({pageType: "table"})
            }).catch(()=>toast.error("Ошибка!"))
    },[UserApi, setSearchParams, toast])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4">
        <UserManagerForm 
            initialValues={initialValues} 
            roles={roles}
            setInitialValues={setInitialValues} 
            submit={submit}/>
    </TabPage>
    )}