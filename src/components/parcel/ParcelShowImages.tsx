import { useState } from "react";
import "./assets/parcel.scss";
import DeleteIcon from "../icons/DeleteIcon";

interface Props{
    readonly data: any[];
    readonly deleteImage: (value: number) => void;
}

export default function AddParcelShowImages({
    data,
    deleteImage
}:Props){
    
    // const [active, setActive] = useState<any>(null);

    return (
        <div className="row">
            {data && data.length > 0 && (
              <>
                {data && data.map((item: any, index: number)=>{
                    return (
                    <div className={`col-2 custom-parcel-image active-custom-parcel-image`} key={index}>
                       <button type="button" className="custom-delete-button" onClick={()=>deleteImage(index)}><DeleteIcon size={16}/></button>
                        <img width="100%" src={item.imageBytes} alt="" />
                     </div>
                    )
                })}
                </>
            )}
            {data.length == 0 && (
                <div className="col-12 d-flex justify-content-center align-items-center" style={{height: "200px",}}>
                    <h2>Загрузка изображений</h2>
                </div>
            )}
        </div>
    )
}