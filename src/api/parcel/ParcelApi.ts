import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllParcel, GetAllRole, GetAllParcelByCourier } from "./ParcelDto";

export class ParcelApi extends ApiContext{
    
    public getAllParcel({pageNumber, pageSize, code}:GetAllParcel):Promise<any>{
        if(code=='')
        {
            return this.get(`/Parcel/GetParcelListWithPaginationByCode?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        }
        else {
            return this.get(`/Parcel/GetParcelListWithPaginationByCode?pageNumber=${pageNumber}&pageSize=${pageSize}&Code=${code}`)
        }
    }

    public getParcelById({id}:IdProps):Promise<any>{
        return this.get(`/Parcel/GetParcelDetailsById/${id}`)
    }

    public getAllParcelByCourier({pageNumber, pageSize, courierId}:GetAllParcelByCourier):Promise<any>{
       
        return this.get(`/Parcel/GetParcelListWithPaginationByCourier?PageNumber=${pageNumber}&PageSize=${pageSize}&CouerierId=${courierId}`)
        
    }

    public deleteParcel(del:any):Promise<any>{
        return this.post(`/Parcel/DeleteParcels`, del)
    }

    public updateParcel(body:any){
        return this.put("/Parcel/UpdateParcel", body)
    }

   public createParcel(body: any){
        return this.post("/Parcel/CreateParcel", body)
   }
}