import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Pagination from "../pagination/Pagination";
import Button from "../button/Button";
import DeleteIcon from "../icons/DeleteIcon";
import TabPage from "../tabs/TabPage";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import PlanTable from "./PlanTable";
import { usePlanApiContext } from "../../api/plan/PlanApiContext";

interface BranchTableWrapperProps{
    readonly create: () => void;
    readonly selectRow: (value: any) => void;
}

export default function PlanTableWrapper({create, selectRow}:BranchTableWrapperProps){

    const { PlanApi } = usePlanApiContext();
    const [data, setData] = useState<any>({})
    const [ids, setIds] = useState([])
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = Number(searchParams.get("pageSize") || 25);
    const pageCount = Number(searchParams.get("pageCount") || 1);

  useEffect(()=>{
     PlanApi.getAllPlan({pageNumber: pageCount, pageSize: pageSize}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
  },[PlanApi, toast, pageCount, pageSize])

  const deletePost = useCallback(()=>{
        const del = {
            id: ids
        }
        PlanApi.deletePlan({del: del}).then(()=>{
            toast.success("Deleted!");
            setIsDelModal(false);
            window.location.reload();
        }).catch(()=>{
            toast.error("Faild!")
        })
  },[ids, setIsDelModal, PlanApi])

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
            <PlanTable 
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