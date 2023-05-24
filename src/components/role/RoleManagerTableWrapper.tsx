import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";
import TabPage from "../tabs/TabPage";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import RoleTable from "./RoleManagerTable";
import { useRoleApiContext } from "../../api/role/RoleApiContext";

interface RoleManagerTableWrapperProps{
    readonly create: () => void;
    readonly editRow: (value: any) => void;
}

export default function RoleManagerTableWrapper({create, editRow}:RoleManagerTableWrapperProps){
    const { RoleApi } = useRoleApiContext();
    const [data, setData] = useState<any>({});
    const [id, setId] = useState(null)
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = Number(searchParams.get("pageSize") || 25);
    const pageCount = Number(searchParams.get("pageCount") || 1);

  useEffect(()=>{
    RoleApi.getAllRole({pageNumber : pageCount, pageSize: pageSize}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
  },[RoleApi, toast, pageCount, pageSize])

  const deleteRow = useCallback((id: any)=>{
        RoleApi.deleteRole({id : id}).then((response: any)=>{
            toast.success("Deleted!");
            setIsDelModal(false);
            window.location.reload();
        }).catch((error: any)=>{
            toast.error("Faild!")
        })
        setId(null);
  },[ setIsDelModal, setId, RoleApi])

    return (
        <TabPage
            childrenClassName="p-2"
            headerComponent={
                <Button onClick={()=>create()} className="mb-2 text-light px-2 py-1 bg-gold">
                    Создать
                </Button>
            }
            footerComponent={
                <div className="d-flex justify-content-end my-3">
                <Pagination 
                    pageNumber={data.pageNumber} 
                    totalCount={data.totalCount} 
                    totalPages={data.totalPages} 
                    onSubmit={(value: any)=>console.log(value)}/>
                </div>
            }
            >
            <RoleTable 
                 editRow={editRow}
                 deleteRow={(row: any)=>{
                    setId(row.id)
                    setIsDelModal(true)
                 }}
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
                            deleteRow(id);
                        }else{
                            setIsDelModal(false);
                        }
                        setId(null);
                    }}/>
            </Modal>
        </TabPage>
    )
}