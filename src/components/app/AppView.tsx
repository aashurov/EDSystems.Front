import "./assets/app-view.scss";
import { DateFormatter } from "../../utils/DateFormatter";

interface Props{
    readonly data: any;
    readonly imageIndex: number;
}

export default function AppView({
    data,
    imageIndex = 0
}:Props){
    return (
        <div className="app-view-layout">
               <div className="row">
                <div className="col-12">
                    <div className="code">
                            <strong>Посылка</strong> - Code: {data.code}// Id: {data.id}  
                        </div>
                    </div>
               </div>
                <div className="row">
                    <div className="col-6 p-4">
                        {data?.parcelImage?.length > 0 && (
                            <img src={data?.parcelImage[imageIndex]?.imageBytes} width="50%" alt="" />
                        )}
                    </div>
                    <div className="col-6 p-4">
                        {/* { <p><strong>Статус - </strong> { data.parcelStatus[0]?.status.name} </p> } */}
                        {/* {<p><strong>Дата регистрации - </strong> {DateFormatter(data.dateCreated)}</p>} */}
                        <p><strong>Отправитель - </strong> { data.sender?.fullName} { data.sender?.phoneNumber}</p>
                        <p><strong>Получатель - </strong> { data.recipient?.fullName } { data.recipient?.phoneNumber}</p>
                        <p><strong>Направление  - </strong> { data.fromBranch?.name} - { data.toBranch?.name }</p>
                        <p><strong>Адрес доставки - </strong> { data.parcelAddress?.deliveryAddress}</p>
                        <p><strong>Адрес забора - </strong> { data.parcelAddress?.pickingUpAddress}</p>
                        <p><strong>Вес посылки - </strong> { data.parcelSize?.weight} кг</p>
                        <p><strong>Количество мест - </strong> { data.parcelSize?.numberOfPoint}</p>
                        <p><strong>Тариф перевозки - </strong> { data.parcelPlan?.name}</p>
                        <p><strong>Стоимость перевозки - </strong> { data.parcelCost?.costDeliveryToBranch}  $ { data.parcelCost?.stateDeliveryToBranch ? "Оплачено" : "Не Оплачено"} </p>
                        <p><strong>Стоимость доставки - </strong> { data.parcelCost?.costDeliveryToPoint}  $ { data.parcelCost?.stateDeliveryToPoint ? "Оплачено" : "Не Оплачено"} </p>
                        <p><strong>Стоимость забора - </strong> { data.parcelCost?.costPickingUp}  $ { data.parcelCost?.statePickingUp ? "Оплачено" : "Не Оплачено"} </p>
                        <p><strong>Итоговая стоимость услуги - </strong> { Number(data.parcelCost?.costDeliveryToBranch) + Number(data.parcelCost?.costDeliveryToPoint) + Number(data.parcelCost?.costPickingUp)} $</p> 
                        <p><strong>Метод оплаты - </strong> { data.parcelCost?.paymentMethod.name.toString() }</p>
                        <p><strong>Курьер для забора - </strong> { data.senderCourier?.fullName} { data.senderCourier?.phoneNumber}</p>
                        <p><strong>Курьер для доставки - </strong> { data.recipinetCourier?.fullName} { data.recipinetCourier?.phoneNumber}</p>
                        <p><strong>Оператор - </strong> { data.senderStaff?.fullName } { data.senderStaff?.phoneNumber}</p>
                    </div>
                </div>  
        </div>
    )
}