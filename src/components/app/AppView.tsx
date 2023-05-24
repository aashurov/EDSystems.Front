import "./assets/app-view.scss";

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
                            <img src={data?.parcelImage[imageIndex]?.imageBytes} width="100%" alt="" />
                        )}
                    </div>
                    <div className="col-6 p-4">
                        <p><strong>Отправитель - </strong> { data.sender?.firstName} { data.sender?.lastName } { data.sender?.phoneNumber}</p>
                        <p><strong>Получатель - </strong> { data.recipient?.firstName} { data.recipient?.lastName } { data.recipient?.phoneNumber}</p>
                        <p><strong>Направление  - </strong> { data.fromBranch?.city} - { data.toBranch?.city }</p>
                        <p><strong>Адрес доставки - </strong> { data.parcelAddress?.deliveryAddress}</p>
                        <p><strong>Адрес забора - </strong> { data.parcelAddress?.pickingUpAddress}</p>
                        <p><strong>Вес посылки - </strong> { data.parcelSize?.weight} кг</p>
                        <p><strong>Количество мест - </strong> { data.parcelSize?.numberOfPoint}</p>
                        <p><strong>Тариф перевозки - </strong> { data.parcelPlan?.name}</p>
                        <p><strong>Стоимость перевозки - </strong> { data.parcelCost?.costDeliveryToBranch}  $ { data.parcelCost?.stateDeliveryToBranch ? "Оплачена" : "Не Оплачена"} </p>
                        <p><strong>Стоимость доставки - </strong> { data.parcelCost?.costDeliveryToPoint}  $ { data.parcelCost?.stateDeliveryToPoint ? "Оплачена" : "Не Оплачена"} </p>
                        <p><strong>Стоимость забора - </strong> { data.parcelCost?.costPickingUp}  $ { data.parcelCost?.statePickingUp ? "Оплачена" : "Не Оплачена"} </p>
                        <p><strong>Итоговая стоимость услуги - </strong> { Number(data.parcelCost?.costDeliveryToBranch) + Number(data.parcelCost?.costDeliveryToPoint) + Number(data.parcelCost?.costPickingUp)} $</p> 
                        <p><strong>Метод оплаты - </strong> { data.parcelCost?.paymentMethod.name.toString() }</p>
                        <p><strong>Оператор - </strong> { data.senderStaff?.firstName} { data.senderStaff?.lastName } { data.senderStaff?.phoneNumber}</p>
                    </div>
                </div>
        </div>
    )
}