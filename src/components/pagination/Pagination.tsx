import { update } from "immupdate";
import React, {useState, useCallback, useEffect} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import NextIcon from "../icons/NextIcon";
import PreviousIcon from "../icons/PreviousIcon";
import "./assets/pagination.scss";
interface PagObjectProps{
    readonly pageSize: any;
    readonly pageCount: any;
}

interface PaginationProps{
    readonly onSubmit?: (value: any) => void;
    readonly pageNumber: number;
    readonly totalPages: number;
    readonly totalCount: number;
}


export default function Pagination({onSubmit, pageNumber, totalCount, totalPages}:PaginationProps){

    const [searchParams, setSearchParams] = useSearchParams();
    const [disabled, setDisaled] = useState(false);
    const [pagObject, setPagObject] = useState<PagObjectProps>({
        pageSize: searchParams.get("pageSize") || 25,
        pageCount: searchParams.get("pageCount") || 1,
    })


    useEffect(()=>{
        if(totalCount <= pagObject.pageSize){
            setDisaled(true)
        }else{
            setDisaled(false)
        }
    },[totalCount, totalPages, setDisaled, pagObject.pageSize, pagObject.pageCount, setPagObject])
    
    const onChangePageSize = useCallback((value: any)=>{
        setPagObject((prev: any)=>update(prev, {
            pageSize: Number(value.target.value)
        }))
        setSearchParams({
            pageSize: value.target.value,
            pageCount: pagObject.pageCount > totalPages? "1" : pagObject.pageCount.toString()
        })
    },[setPagObject, pagObject, onSubmit, update])



    const onChangePageCount = useCallback((value: any)=>{
        if(value === "inc" && Number(pagObject.pageCount) < totalPages){
            setPagObject((prev: any)=>update(prev, {
                pageCount: Number(pagObject.pageCount) + 1
            }))
            setSearchParams({
                pageSize: pagObject.pageSize.toString(),
                pageCount: (Number(pagObject.pageCount) + 1).toString()
            })
        }else if (Number(pagObject.pageCount) > 1 && value === "dec"){
            {
                setPagObject((prev: any)=>update(prev, {
                    pageCount: Number(pagObject.pageCount) - 1
                }))
                setSearchParams({
                    pageSize: pagObject.pageSize.toString(),
                    pageCount: (Number(pagObject.pageCount) - 1).toString()
                })
            }
        }
       
    },[setPagObject, pagObject, onSubmit, update, totalCount])



    return (
        <div className="pagination-container">
                <select name="select-page-size" id="select-page-size" value={pagObject.pageSize} onChange={onChangePageSize}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                </select>
                <div>
                    {pageNumber} of {totalPages}
                </div>
                <div className="pagination-btn-group">
                    <button disabled={disabled} className="previous" onClick={()=>onChangePageCount("dec")}>
                   <PreviousIcon size={15}/>
                </button>
                <button className="now-size">
                    {pageNumber}
                </button>
                <button disabled={disabled} className="next" onClick={()=>onChangePageCount("inc")}>
                    <NextIcon size={15}/>
                </button>
                </div>
                <div><span>Total: </span>
                    <span>{totalCount}</span>
                </div>
        </div>
    )
}