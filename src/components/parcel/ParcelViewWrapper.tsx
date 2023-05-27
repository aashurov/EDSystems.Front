import { useSearchParams } from "react-router-dom";
import TabPage from "../tabs/TabPage";
import { useEffect, useMemo, useState } from "react";
import { request } from "../../api/request";
import ParcelView from "./ParcelView";

export default function ParcelViewWrapper(){

    const [search, setSearch] = useSearchParams();
    const [data, setData] = useState({});

    const ID = useMemo(()=>search.get('parcelId') ? search.get('parcelId') : "", [search]);

    useEffect(()=>{
        if(Boolean(ID)){
            request.get(`/Parcel/GetParcelDetailsById/${ID}`).then((response: any)=>{
                // console.log(response.data)
                setData(response.data);
            }).catch((error: any)=>{
                // console.log(error)
            })
        }
    },[ID, request, setData])    

    return (
       <TabPage
            childrenClassName="p-3"
            >
            <ParcelView
                data={data}
                />
       </TabPage>
    )
}