import { useState } from "react";
import "./assets/parcel-view-image-list.scss";

interface Props{
    readonly images: any[];
    readonly setImage: (value: any) => void;
}

export default function ParcelViewImageList({
    images,
    setImage
}:Props){

    const [activeImageIndex, setActiveImageIndex] = useState(0)

    if(images?.length === 0) return null;

    return (
        <div className="parcel-view-image-list row p-4">
            {images && images.map((image: any, index: number)=>{
                return (
                    <div 
                        key={index}  
                        className={`col-2 m-1 image-item ${activeImageIndex === index?"active-image-item":""}`}
                        onClick={()=>{
                            setActiveImageIndex(index);
                            setImage(index);
                        }}
                        >
                        <img src={image.imageBytes} width="50%" alt="" />
                    </div>
                )
            })}
        </div>
    )
}