import React from "react";
import TableButton from "../button/TableButton";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";
import { DateFormatter } from "../../utils/DateFormatter";
import EyeIcon from "../icons/EyeIcon";

interface BranchTableProps{
    readonly data: any;
    readonly selectRow: (value: any) => void;
    readonly selectRowForView: (value: any) => void;
    readonly selectRowCheckbox: (value: any) => void;
}

export default function ParcelTable({
    data, 
    selectRow, 
    selectRowForView,
    selectRowCheckbox
}:BranchTableProps){
    const headers:any = [
        {
            header: '№',
            access: 'id',
            width: 60
        },
        {
            header: 'Код',
            access: 'code',
            width: 100
        },
        {
            header: 'Получатель',
            access: 'sender',
            width: 400,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.sender.firstName} {row.sender.lastName}
                            </>
                        )
            },
        },
        {
            header: 'Вес',
            access: 'parcelSize',
            width: 50,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.parcelSize.weight} кг
                            </>
                        )
            },
        },
        {
            header: 'Место',
            access: 'plan',
            width: 10,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.parcelSize.numberOfPoint}
                            </>
                        )
            },
        },
        {
            header: 'Итого',
            access: 'summa',
            width: 40,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.parcelCost.costPickingUp + row.parcelCost.costDeliveryToPoint + row.parcelCost.costDeliveryToBranch} $
                            </>
                        )
            },
        },
        {
            header: 'Статус',
            access: 'status',
            width: 100,
            ceil: (row: any) => {
                return row.parcelStatus.map((item:any, index: number)=>{
                   if(item.isCurrent){
                    return <div className="text-success fw-bold rounded ps-2 py-1 mb-1">
                    {item.status.name}
                    </div>
                   }
                   
                 })
             }
        },
        {
            header: 'Дата',
            access: 'date',
            width: 100,
            ceil: (row: any)=>{
                return (
                            <>
                            {DateFormatter(row.dateCreated)}
                            </>
                        )
            },
        },
        // {
        //     header: 'Phone',
        //     access: 'phone',
        //     width: 200
        // },
        // {
        //     header: 'Code',
        //     access: 'code',
        //     width: 200
        // },
        {
            header: "...",
            access: 'edit',
            ceil: (row: any)=>{
                return (
                            <div className="d-flex">
                            <TableButton
                                className="bg-warning"
                                onClick={()=>selectRow(row)}
                                >
                                <EditIcon color="white" size={14}/>
                            </TableButton>
                            <TableButton
                                className="bg-success ms-2"
                                onClick={()=>selectRowForView(row)}
                                >
                                <EyeIcon color="white" size={14}/>
                            </TableButton>
                            </div>
                        )
            },
            width: 100,
        },
        
    ]
    return (
        <Table 
            selectRowCheckbox={selectRowCheckbox} 
            data={data} 
            headers={headers} 
            withCheckbox={true}/>)
}