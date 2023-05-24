import React from "react";
import TableButton from "../button/TableButton";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";

interface RoleManagerTableProps{
    readonly data: any;
    readonly editRow: (value: any) => void;
    readonly deleteRow: (value: any) => void;
}

export default function RoleManagerTable({data, editRow, deleteRow}:RoleManagerTableProps){
    const headers:any = [
        {
            header: 'Название',
            access: 'name',
            width: 400
        },
        {
            header: "...",
            access: 'edit',
            ceil: (row: any)=>{
                return (
                            <div className="d-flex">
                            <TableButton
                                className="bg-warning me-3"
                                onClick={()=>editRow(row)}
                                >
                                <EditIcon color="white" size={14}/>
                            </TableButton>
                            <TableButton
                                className="bg-danger"
                                onClick={()=>deleteRow(row)}
                                >
                                <DeleteIcon color="white" size={14}/>
                            </TableButton>
                            </div>
                        )
            },
            width: 60,
        },
        
    ]
    return (<Table data={data} headers={headers} withCheckbox={false}/>)
}