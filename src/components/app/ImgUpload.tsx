import React , {useState, useCallback} from "react";
import "./assets/upload.scss";
import Modal from "../modal/Modal";
import Loading from "../loading/Loading";

interface ImgUploadProps{
    readonly setImage: (value: any) => void;
    readonly className?: string;
}

export default function ImgUpload({setImage, className}:ImgUploadProps){

    const [isModal, setIsModal] = useState(false);

    const handleChange = (value: any) => {
        const formDate = new FormData();
        for(let i = 0; i<value.target.files.length; i++){
            formDate.append(`${i}`, value.target.files[i])
        }
        setIsModal(true)
        fetch(`https://httpbin.org/post`,{
            method: "POST",
            body: formDate
        }).then((response: any)=>response.json())
        .then((data: any)=>{
            setIsModal(false)
            setImage(data.files)
        })
        .catch((error: any)=>console.log(error))
    }

    return (
        <div className={`upload-container ${className}`}>
            <input id="fileUpload" multiple className="hidden" type="file" hidden onChange={(event: any) => handleChange(event)} />
            <label className="upload-label" htmlFor="fileUpload">Загрузка изображений</label>
            <Modal
                width="400px"
                height="100px"
                show={isModal}
                className="d-flex justify-content-center align-items-center"
                closeHandler={()=>console.log("value")}
                >
                   <div className="d-flex justify-content-center align-items-center h-100">
                        <h5>Images are uploading...</h5>
                   </div>
            </Modal>
        </div>
    )
}