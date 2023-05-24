import { useState } from "react";
import AppView from "../app/AppView";
import ParcelViewImageList from "./ParcelViewImageList";

interface Props{
    readonly data: any;
}

export default function ParcelView({
    data
}:Props){

    const [imageIndex, setImageIndex] = useState(0);

    return (
    <div>
        <AppView 
            data={data}
            imageIndex={imageIndex}
            />
        <ParcelViewImageList
            images={data.parcelImage}
            setImage={(value: any)=>setImageIndex(value)}
            />
    </div>)
}