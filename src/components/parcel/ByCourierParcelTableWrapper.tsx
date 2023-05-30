import { useSearchParams } from "react-router-dom";
import ByCourierParcelTable from "./ByCourierParcelTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParcelApiContext } from "../../api/parcel/ParcelApiContext";
import TabPage from "../tabs/TabPage";
import Button from "../button/Button";
import { request } from "../../api/request";

export default function ByCourierParcelTableWrapper(){
    const [search, setSearch] = useSearchParams();
    const couirerId = useMemo(()=>search.get("courierId")?search.get("courierId"):"",[])
    const [ids, setIds] = useState([]);


    const pageSize = Number(search.get("pageSize") || 25);
    const pageCount = Number(search.get("pageCount") || 1);
    const { ParcelApi } = useParcelApiContext(); 
    const [data, setData] = useState<any[]>([]);

    useEffect(()=>{
        if(Boolean(couirerId)){
            ParcelApi.getAllParcelByCourier({pageNumber: pageCount, pageSize: pageSize, courierId: Number(couirerId)})
            .then((response: any)=>setData(response.data.items))
            .catch((error: any)=>console.log(error))
        }
    },[couirerId, ParcelApi, setData])

    const onPrint = useCallback(()=>{
        const codes = [];
        for(let i = 0; i<ids.length; i++){
            const code = Number(data.filter((item: any)=>item.id === ids[0])[0].code);
            codes.push(code)
        }
        const query = {
            code: codes,
            id: couirerId,
        }
        request.post(`/File/GetJobList`, query, 
        {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            },
            responseType: 'blob',
        }
        )
        .then((response: any)=>{
            const href = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${couirerId}.pdf`);
            document.body.appendChild(link);
            link.click();
        
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
        .catch((error: any)=>console.log(error))
    },[ids, data, request, couirerId])

    const onPrintInvoice = useCallback((value: any)=>{
        const query = {
            id: value.id,
        }
        request.post(`/File/GetInvoice`, 
        query,
        {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`,
            },
            responseType: 'blob',
        }
        )
        .then((response: any)=>{
            const href = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', `${couirerId}.pdf`);
            document.body.appendChild(link);
            link.click();
        
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
        .catch((error: any)=>console.log(error))
    },[request])


    return (
        <TabPage
                childrenClassName="p-3"
                footerComponent={
                    <Button
                    className="px-3 py-1 bg-warning text-light mt-2"
                    onClick={()=>onPrint()}
                    >
                        Print
                    </Button>
                }
                >
            <ByCourierParcelTable 
                    data={data}
                    setIds={setIds}
                    onPrint={(value: any)=>onPrintInvoice(value)}
                    />
        </TabPage>
    )
}