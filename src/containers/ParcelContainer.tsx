import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ContainerLayout from "../components/app/ContainerLayout";
import AddParcelFormWrapper from "../components/parcel/ParcelFormWrapper";
import ParcelTableWrapper from "../components/parcel/ParcelTableWrapper";
import ParcelViewWrapper from "../components/parcel/ParcelViewWrapper";
import ByCouriersTab from "../components/parcel/ByCouriersTab";
import ByCustomersTab from "../components/parcel/ByCustomersTab";

export default function ParcelContainer(){
    const { tab = "all-parcels" } = useParams();
    const navigator = useNavigate();
    const [search, setSearch] = useSearchParams();
    return (
        <ContainerLayout>
           {tab === "all-parcels" && (
            <ParcelTableWrapper 
            selectRow={(value)=>{
                navigator(`/app/parcels/parcel-form?parcelId=${value.id}`);
            }}
            selectRowForView={(value)=>{
                navigator(`/app/parcels/parcel-view?parcelId=${value.id}`);
            }}
            />
           )}
           {tab === "parcel-form" && (
            <AddParcelFormWrapper/>
           )}
           {tab === "parcel-view" && (
            <ParcelViewWrapper/>
           )}
           {tab === "by-couriers" && (
            <ByCouriersTab/>
          )}
          {tab === "by-customers" && (
            <ByCustomersTab/>
          )}
        </ContainerLayout>
    )
}