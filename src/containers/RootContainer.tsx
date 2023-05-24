import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { request } from "../api/request";
import { set_user_profile } from "../redux/action";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Pages, RouteContainerTabs } from "../constants/Routes";
import AppContainer from "./AppContainer";
import AuthContainer from "./AuthContainer";
import AdministratorContainer from "./AdministratorContainer";
import UsersContainer from "./UsersContainer";
import ParcelContainer from "./ParcelContainer";
import EditParcelStatusContainer from "./EditParcelStatusContainer";
import EditParcelStatusSecondContainer from "./EditParcelStatusSecondCotnainer";


export default function RootContainer(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector((state: any) =>state.data.profile)

    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate('/')
        }
    },[navigate, localStorage])

    const onSubmit = useCallback((value: any)=>{
        request.post("/Authentication/Login", { 
    
        "email": value.email,
        "password": value.password
        
            }).then((response: any)=>{
                if(response.data.result){
                    localStorage.setItem("token", response.data.token)
                    dispatch(set_user_profile(response.data.token))
                    toast.success(response.data.message[0])
                    if(profile.role[0]==="Administrator")
                    {
                        navigate('/app/administrator')
                    }
                    else if(profile.role[0]==="Staff")
                    {
                        navigate('/app/parcels/all-parcels')
                    }
                    else if(profile.role[0]==="Manager")
                    {
                        navigate('/app/users')
                    }
                    window.location.reload();
                }else{
                    alert(response.data.message[0])
                }
          }).catch((erro: any)=>toast.error(erro.response.data.message[0]))
        },[request, profile])

    return (
      <Routes>
        <Route path={Pages.Login} element={<AuthContainer onsubmit={(value:any)=>onSubmit(value)}/>}/>
        <Route path={Pages.App} element={<AppContainer/>}>
                <Route path={RouteContainerTabs.AdministratorPath} element={<AdministratorContainer/>}/>
                <Route path={RouteContainerTabs.UsersPath} element={<UsersContainer/>}/>
                <Route path={RouteContainerTabs.ParcelsPath} element={<ParcelContainer/>}/>
                <Route path={RouteContainerTabs.EditParcelPath} element={<EditParcelStatusContainer/>}/>
                <Route path={RouteContainerTabs.EditParcelSecondPath} element={<EditParcelStatusSecondContainer/>}/>
        </Route>
      </Routes>
)
}