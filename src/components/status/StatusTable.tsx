import React from "react";
import TableButton from "../button/TableButton";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";

interface StatusTableProps{
    readonly data: any;
    readonly selectRow: (value: any) => void;
    readonly selectRowCheckbox: (value: any) => void;
}

export default function StatusTable({data, selectRow, selectRowCheckbox}:StatusTableProps){
    const headers:any = [
        {
            header: 'Название',
            access: 'name',
            width: 200
        },
        {
            header: 'Описание',
            access: 'description',
            width: 300
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