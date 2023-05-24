import React from "react";
import TableButton from "../button/TableButton";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";

interface BranchTableProps{
    readonly data: any;
    readonly selectRow: (value: any) => void;
    readonly selectRowCheckbox: (value: any) => void;
}

export default function BranchTable({data, selectRow, selectRowCheckbox}:BranchTableProps){
    const headers:any = [
        {
            header: '№',
            access: 'id',
            width: 10
        },
        {
            header: 'Название',
            access: 'name',
            width: 140
        },
        {
            header: 'Email',
            access: 'email',
            width: 200
        },
        {
            header: 'Город',
            access: 'city',
            width: 200
        },
        {
            header: 'Адрес',
            access: 'address',
            width: 1000
        },
        {
            header: 'Страна',
            access: 'country',
            width: 180
        },
        {
            header: 'Контакт',
            access: 'phone',
            width: 200
        },
        {
            header: 'Код',
            access: 'code',
            width: 120
        },
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
                            </div>
                        )
            },
            width: 100,
        },
        
    ]
    return (<Table selectRowCheckbox={selectRowCheckbox} data={data} headers={headers} withCheckbox={true}/>)
}