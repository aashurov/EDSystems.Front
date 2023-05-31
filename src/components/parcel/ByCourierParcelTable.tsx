import { DateFormatter } from "../../utils/DateFormatter";
import TableButton from "../button/TableButton";
import BookIcon from "../icons/BookIcon";
import PrintIcon from "../icons/PrintIcon";
import Table from "../table/Table";

interface Props{
    readonly data: any[];
    readonly setIds: (value: any) => void;
    readonly onPrint: (value: any) => void;

}

export default function ByCourierParcelTable({data, setIds, onPrint}:Props){
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
            header: 'Отправитель',
            access: 'sender',
            width: 400,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.sender.fullName} 
                            </>
                        )
            },
        },
        {
            header: 'Получатель',
            access: 'sender',
            width: 400,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.recipient.fullName} 
                            </>
                        )
            },
        },
        {
            header: 'Направление',
            access: 'sender',
            width: 180,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.fromBranch.name} - {row.toBranch.name}
                            </>
                        )
            },   
        },
        {
            header: 'Тариф',
            access: 'parcelPlan',
            width: 50,
            ceil: (row: any)=>{
                return (
                            <>
                            {row.parcelPlan.name} 
                            </>
                        )
            },
        },
        {
            header: 'Вес',
            access: 'parcelSize',
            width: 120,
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
        {
            header: "...",
            access: 'edit',
            width: 60,
            ceil: (row: any)=>{
                return (
                           <TableButton 
                                onClick={()=>onPrint(row)}
                                className="bg-success">
                                <PrintIcon color="white"/>
                           </TableButton> 
                        )
            },
        },
        
    ]
    return <Table withCheckbox selectRowCheckbox={setIds} headers={headers} data={data}/>
}