import React , {useState, useEffect, useCallback} from "react";
import { toast } from "react-toastify";
import { request } from "../../api/request";
import Pagination from "../pagination/Pagination";
import TabPage from "../tabs/TabPage";
import Modal from "../modal/Modal";
import { useSearchParams } from "react-router-dom";
import YesOrNoModal from "../app/YesOrNoModal";
import UserManagerTable from "./ByUserManagerTable";
import { useUserApiContext } from "../../api/user/UserApiContext";
import { Form, Formik } from "formik";
import InputField from "../form/InputField";
import { object, string } from "yup";
import { update } from "immupdate";

interface UserManagerTableWrapperProps{
    readonly editRow: (value: any) => void;

    readonly roleId: number;
}
const validationSchema = object({
    searchText: string()
})
export default function UserManagerTableWrapper({editRow, roleId}:UserManagerTableWrapperProps){

    const { UserApi } = useUserApiContext();
    const [data, setData] = useState<any>({});
    const [id, setId] = useState(null)
    const [isDelModal, setIsDelModal] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = Number(searchParams.get("pageSize") || 25);
    const pageCount = Number(searchParams.get("pageCount") || 1);
   
    const [initialValues, setInitialValues] = useState({
        searchText: ""
    })

  useEffect(()=>{
    UserApi.getAllUsersWithSearchText({pageNumber: pageCount, pageSize: pageSize, roleId: roleId,  searchText: initialValues.searchText}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
  },[UserApi, toast, pageCount, pageSize, roleId])

  const deleteRow = useCallback((id: any)=>{
        UserApi.deleteUser(id).then(()=>{
            toast.success("Удалено!");
            setIsDelModal(false);
            window.location.reload();
        }).catch(()=>{
            toast.error("Ошибка!")
        })
        setId(null);
  },[ setIsDelModal, setId])

  const onChangeCode = useCallback((value: any)=>{
    setInitialValues((prev: any)=>update(prev, {
        searchText: value.target.value
    }))
},[setInitialValues])

  const onSubmit = useCallback((value: any)=>{
  
    if(value.searchText.length > 0){
        UserApi.getAllUsersWithSearchText({pageNumber: pageCount, pageSize: pageSize, roleId: roleId, searchText: value.searchText}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
    }else if(value.code.length === 0) {
        UserApi.getAllUsersWithSearchText({pageNumber: pageCount, pageSize: pageSize, roleId: roleId, searchText: value.searchText}).then((respon: any)=>setData(respon.data)).catch((error)=>toast.error(error.message))
    }
    else  {
        toast.warning("Код не должен быть меньше 9 символов")
    }

},[UserApi])

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
                            name="searchText"
                            placeholder="Поиск..."
                            value={initialValues.searchText}
                            onChange={(value: any)=>onChangeCode(value)}
                            />
                        </Form>
                    )}
                </Formik>
                </div>
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
            <UserManagerTable 
                 editRow={editRow}
                 deleteRow={(row: any)=>{
                    setId(row.id)
                    setIsDelModal(true)
                 }}
                 byCourier={(row: any)=>{
                    setSearchParams({pageType: "curier-parcel-tab", courierId: row.id})
                 }}
                 byCourierPickup={(row: any)=>{
                    setSearchParams({pageType: "curier-parcel-tab", courierId: row.id})
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