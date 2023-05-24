import React, { useCallback, useState, ReactNode, useEffect } from "react";
import Loading from "../loading/Loading";
import "./assets/table.scss";

interface HeaderProps{
    readonly width?: number; 
    readonly access: string;
    readonly header: string;
    readonly ceil?: ReactNode;
}

interface TableProps{
    readonly headers: HeaderProps[];
    readonly data: any[];
    readonly selectRowCheckbox?: (select: any[]) => void;
    readonly withCheckbox?: boolean;
}

export default function Table({data, headers, selectRowCheckbox, withCheckbox = false}:TableProps){
    
    const [dataTable, setDataTable] = useState<any[]>([]);
    useEffect(()=>{
        setDataTable(data)
    },[setDataTable, data])

    const handleChange = useCallback((value: any)=>{
        const { name, checked } = value.target;
        if(name === "allSelect"){
            let ar = dataTable.map((item: any)=>{
                return {...item, isChecked: checked}
            });
            setDataTable(ar);
            setIds(ar);
        }else{
            let ar = dataTable.map((item: any, index: any)=> index.toString() === name? {...item, isChecked: checked} : item);
            setDataTable(ar);
            setIds(ar);
        }
    },[setDataTable, dataTable])


    const setIds = useCallback((value: any)=>{
        let arr = value.map((item: any)=>{
            if(item.isChecked){
                return item.id
            }
        });
        let arrr = arr.filter((item: any)=>item)
        selectRowCheckbox && selectRowCheckbox(arrr)
    },[selectRowCheckbox])

    if(!dataTable || dataTable.length === 0){
      return <Loading/>;
       
    }


    return (
        <table className="table table-striped px-2" style={{position: 'relative'}}>
            <thead className="px-2">
                <tr>
                    <th style={{width: '40px'}}>
                        {withCheckbox?(
                            <input 
                                type="checkbox" 
                                name="allSelect" 
                                checked={!dataTable?.some((user:any) => user?.isChecked !== true)}
                                onChange={handleChange}/>
                        ):(
                            <span>#</span>
                        )}
                        </th>
                   {headers.map((head: any, index: any)=>{
                    return (
                        <th key={index} style={{width: `${head.width}px`}}>
                            {head.header}
                        </th>
                    )
                   })}
                </tr>
            </thead>
            <tbody>
                {dataTable?.map((row: any, index: number)=>{
                    return (
                        <tr key={index}>
                            <td style={{width: '40px'}}>
                                    {withCheckbox?(
                                    <input 
                                        type="checkbox" 
                                        name={index.toString()}
                                        checked={row.isChecked || false}
                                        onChange={handleChange}/>
                                     ):(
                                     <span>{index+1}.</span>
                                     )}  </td>
                                     {headers.map((head: any, i: number)=>{
                                return (
                                    <td key={i} style={{width: `${head.width}px`}}>
                                        {(head.ceil)?(
                                           <div>{head.ceil(row)}</div>
                                        ):(
                                            <span>{row[head.access]}</span>
                                        )}
                                    </td>
                                )
                            })}    
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
    )
}