import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Pagination from "../pagination/Pagination";
import TabPage from "../tabs/TabPage";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import UserManagerTable from "./UserManagerTable";
import { useUserApiContext } from "../../api/user/UserApiContext";

interface UserManagerTableWrapperProps{
    readonly editRow: (value: any) => void;
    readonly roleId: number;
}

export default function UserManagerTableWrapper({editRow, roleId}:UserManagerTableWrapperProps){

    const { UserApi } = useUserApiContext();
    const [data, setData] = useState<any>({});
    const [id, setId] = useState(null)
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = Number(searchParams.get("pageSize") || 25);
    const pageCount = Number(searchParams.get("pageCount") || 1);

  useEffect(()=>{
    UserApi.getAllUsers({pageNumber: pageCount, pageSize: pageSize, roleId: roleId}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
  },[UserApi, toast, pageCount, pageSize, roleId])

  const deleteRow = useCallback((id: any)=>{
        UserApi.deleteUser(id).then(()=>{
            toast.success("Deleted!");
            setIsDelModal(false);
            window.location.reload();
        }).catch(()=>{
            toast.error("Faild!")
        })
        setId(null);
  },[ setIsDelModal, setId])

    return (
        <TabPage
            childrenClassName="p-2"
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
            <UserManagerTable 
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