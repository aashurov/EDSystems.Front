import { useSearchParams } from "react-router-dom";
import ByCourierParcelTable from "./ByCourierParcelTable";
import { useEffect, useMemo, useState } from "react";
import { useParcelApiContext } from "../../api/parcel/ParcelApiContext";
import TabPage from "../tabs/TabPage";
import Button from "../button/Button";

export default function ByCourierParcelTableWrapper(){
    const [search, setSearch] = useSearchParams();
    const couirerId = useMemo(()=>search.get("courierId")?search.get("courierId"):"",[])


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

    return (
        <TabPage
                childrenClassName="p-3"
                footerComponent={
                    <Button
                    className="px-3 py-1 bg-warning text-light mt-2"
                    >
                        Print
                    </Button>
                }
                >
            <ByCourierParcelTable data={data}/>
        </TabPage>
    )
}