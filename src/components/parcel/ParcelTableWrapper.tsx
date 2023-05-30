import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";
import DeleteIcon from "../icons/DeleteIcon";
import TabPage from "../tabs/TabPage";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import ParcelTable from "./ParcelTable";
import { useParcelApiContext } from "../../api/parcel/ParcelApiContext";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import InputField from "../form/InputField";
import { update } from "immupdate";
import { request } from "../../api/request";

interface BranchTableWrapperProps{
    readonly selectRow: (value: any) => void;
    readonly selectRowForView: (value: any) => void;
}

const validationSchema = object({
    code: string()
})

export default function ParcelTableWrapper({
    selectRow,
    selectRowForView
}:BranchTableWrapperProps){

    const { ParcelApi } = useParcelApiContext();
    const [data, setData] = useState<any>({})
    const [ids, setIds] = useState([])
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = Number(searchParams.get("pageSize") || 25);
    const pageCount = Number(searchParams.get("pageCount") || 1);
    const [initialValues, setInitialValues] = useState({
        code: ""
    })

  useEffect(()=>{
     ParcelApi.getAllParcel({pageNumber: pageCount, pageSize: pageSize, code: initialValues.code}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
  },[ParcelApi, toast, pageCount, pageSize])

  const deletePost = useCallback(()=>{
        const id = ids
        ParcelApi.deleteParcel({id}).then(()=>{
            toast.success("Deleted!");
            setIsDelModal(false);
            window.location.reload();
        }).catch(()=>{
            toast.error("Faild!")
        })
  },[ids, setIsDelModal, ParcelApi])

  const onChangeCode = useCallback((value: any)=>{
        setInitialValues((prev: any)=>update(prev, {
            code: value.target.value
        }))
  },[setInitialValues])

  const onSubmit = useCallback((value: any)=>{
        if(value.code.length === 9){
            ParcelApi.getAllParcel({pageNumber: pageCount, pageSize: pageSize, code: value.code}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
        }else if(value.code.length === 0) {
            ParcelApi.getAllParcel({pageNumber: pageCount, pageSize: pageSize, code: value.code}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
        }
        else  {
            toast.warning("Код не должен быть меньше 9 символов")
        }

},[ParcelApi])

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
        link.setAttribute('download', `${"Invoice"}.pdf`);
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    })
    .catch((error: any)=>console.log(error))
},[request])

    return ( 
        <TabPage
            childrenClassName="p-2"
            headerComponent={
                <div className="d-flex justify-content-end s">
                    <Formik
                    initialValues={initialValues}
                    onSubmit={()=>onSubmit(initialValues)}
                    validationSchema={validationSchema}
                    >
                    {()=>(
                        <Form>
                            <InputField
                            width={300}
                            name="code"
                            placeholder="Поиск..."
                            value={initialValues.code}
                            onChange={(value: any)=>onChangeCode(value)}
                            />
                        </Form>
                    )}
                </Formik>
                </div>
            }
            footerComponent={
                <div className="d-flex justify-content-between my-3">
                <Button className="bg-danger px-2 py-2" onClick={()=>{
                    if(ids.length === 0){
                        toast.error("Пожалуйста выбирите филиал")
                    }else{
                        setIsDelModal(true)}}
                    }
                    >
                    <DeleteIcon color="white" size={16}/>
                </Button>
                <Pagination 
                    pageNumber={data.pageNumber} 
                    totalCount={data.totalCount} 
                    totalPages={data.totalPages} 
                    onSubmit={(value: any)=>console.log(value)}/>
                </div>
            }
            >
            <ParcelTable 
                 selectRowCheckbox={setIds} 
                 selectRow={selectRow}
                 selectRowForView={selectRowForView} 
                 onPrint={onPrintInvoice}
                 data={data.items}/>
            <Modal
                width="500px"
                show={isDelModal}
                closeHandler={()=>setIsDelModal(false)}
                className="d-flex justify-content-center align-items-center"
                >
                    <YesOrNoModal 
                        titleText="Вы уверены, что хотите удалить?"
                        onClick={(value: boolean)=>{
                        if(value){
                            deletePost();
                        }else{
                            setIsDelModal(false);
                        }
                    }}/>
            </Modal>
        </TabPage>
    )
}