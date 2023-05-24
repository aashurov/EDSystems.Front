import React from "react";
import TableButton from "../button/TableButton";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import Table from "../table/Table";

interface UserManagerTableProps{
    readonly data: any;
    readonly editRow: (value: any) => void;
    readonly deleteRow: (value: any) => void;
}

export default function UserManagerTable({data, editRow, deleteRow}:UserManagerTableProps){
    const headers:any = [
        {
            header: 'ID',
            access: 'id',
            width: 40
        },
         {
            header: 'Имя',
            access: 'firstName',
            width: 100
        },
        // {
        //     header: 'Date',
        //     access: 'dateCreated',
        //     width: 100
        // },
        {
            header: 'Фамилия',
            access: 'lastName',
            width: 100
        },
        {
            header: 'Адрес',
            access: 'address',
            width: 100
        },
        {
            header: 'Контакт',
            access: 'phone',
            width: 100
        },
        {
            header: 'Логин',
            access: 'email',
            width: 100
        },
        {
            header: 'Роль',
            access: 'userRoles',
            width: 80,
            ceil: (row: any) => {
               return row.userRoles.map((item:any, index: number)=>{
                   return <div className="text-success fw-bold rounded ps-2 py-1 mb-1">
                   {item.role.name}
                   </div>
                })
            }
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