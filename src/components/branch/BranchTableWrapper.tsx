import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";
import DeleteIcon from "../icons/DeleteIcon";
import TabPage from "../tabs/TabPage";
import BranchTable from "./BranchTable";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import { useBranchApiContext } from "../../api/branch/BranchApiContext";

interface BranchTableWrapperProps{
    readonly create: () => void;
    readonly selectRow: (value: any) => void;
}

export default function BranchTableWrapper({create, selectRow}:BranchTableWrapperProps){

    const { BranchApi } = useBranchApiContext();
    const [data, setData] = useState<any>({})
    const [ids, setIds] = useState([])
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = Number(searchParams.get("pageSize") || 25);
    const pageCount = Number(searchParams.get("pageCount") || 1);

  useEffect(()=>{
     BranchApi.getAllBranch({pageNumber: pageCount, pageSize: pageSize}) .then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
      
  },[BranchApi, toast, pageCount, pageSize, setData])

  const deletePost = useCallback(()=>{
        const del = {
            id: ids
        }
       BranchApi.deleteBranch(del).then(()=>{
            toast.success("Deleted!");
            setIsDelModal(false);
            window.location.reload();
        }).catch(()=>{
            toast.error("Faild!")
        })
  },[ids, setIsDelModal, BranchApi, toast])

    return (
        <TabPage
            childrenClassName="p-2"
            headerComponent={
                <Button onClick={()=>create()} className="mb-2 text-light px-2 py-1 bg-gold">
                    Создать
                </Button>
            }
            footerComponent={
                <div className="d-flex justify-content-between my-3">
                <Button className="bg-danger px-2 py-2" onClick={()=>{
                    if(ids.length === 0){
                        toast.error("Please choose branch")
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
            <BranchTable 
                 selectRowCheckbox={setIds} 
                 selectRow={selectRow} 
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