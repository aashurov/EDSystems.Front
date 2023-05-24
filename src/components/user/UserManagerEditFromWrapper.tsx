import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import UserManagerEditClaimForm from "./UserManagerEditClaim";
import UserManagerEditForm from "./UserManagerEditForm";
import UserManagerEditPasswordForm from "./UserManagerEditPassword";
import UserManagerEditRoleForm from "./UserManagerEditRole";
import { useUserApiContext } from "../../api/user/UserApiContext";

interface UserManagerFormWrapperProps{
    readonly back: () => void
}

// "firstName": "string",
// "lastName": "string",
// "userName": "string",
// "email": "string",
// "phoneNumber": "string",
// "address": "string",
// "roleName": "string",
// "passwordHash": "string"

export default function UserManagerEditFormWrapper({back}:UserManagerFormWrapperProps){

    const { UserApi } = useUserApiContext();
    const navigation = useNavigate();
    const [claims, setClaims] = useState<any>([]);
    const [roles, setRoles] = useState<any>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("userId");
   
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        phoneNumber: "",
        address: "",
    })

    const [initialPassword, setInitialPassword] = useState({
        passwordHash: ""
    })

    const [initialRole, setInitialRole] = useState({
        roleName: ""
    })

    const [initialClaim, setInitialClaim] = useState({
        claim: ""
    })

    useEffect(()=>{
        if(id){
               UserApi.getUserById({id: Number(id)}).then((respon: any)=>{
                    setInitialValues(respon.data)
                    setClaims(respon.data.userClaim);
                    setRoles(respon.data.userRoles)
                }).catch((error)=>toast.error(error.message))
        }
    },[setInitialValues, UserApi, toast, setClaims, id])

    const submit = useCallback((value: any)=>{
        const data = {
            id: Number(),
            firstName: value.firstName,
            lastName: value.lastName,
            address: value.address,
            phoneNumber: value.phoneNumber,
        }
        UserApi.updateUser(data).then(()=>{
                toast.success("Updated!")
                setSearchParams({pageType: "table"})
            }).catch(()=>toast.error("Fail!"))
    },[UserApi, searchParams, setInitialValues,])

    return (
    <TabPage 
        childrenClassName="p-3 pt-4"
        headerComponent={
            <Button onClick={back} className="bg-gold text-light mb-2 px-2 py-1">
                Назад
            </Button>
        }
        >
            <div className="row">
                <div className="col-12 mb-3">
                    <UserManagerEditForm initialValues={initialValues} setInitialValues={setInitialValues} submit={submit}/>
                </div>
                <div className="col-4">
                    <UserManagerEditPasswordForm initialValues={initialPassword} setInitialValues={setInitialPassword} submit={submit}/>
                </div>
                <div className="col-4">
                    <UserManagerEditRoleForm initialValues={initialRole} setInitialValues={setInitialRole} submit={submit}/>
                </div>
                <div className="col-4">
                    <UserManagerEditClaimForm initialValues={initialClaim} setInitialValues={setInitialClaim} submit={submit}/>
                </div>
            </div>

    </TabPage>
    )}