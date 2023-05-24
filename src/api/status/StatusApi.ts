import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./StatusDto";

export class StatusApi extends ApiContext{
    
    public getAllStatus({pageNumber, pageSize}:GetAllRole):Promise<any>{
        return this.get(`/Status/GetStatusListWithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }


    public getAllStatusWithoutPagination():Promise<any>{
        return this.get(`/Status/GetStatusList`)
    }

    public getStatusById({id}:IdProps):Promise<any>{
        return this.get(`/Status/GetStatusDetails/${id}`)
    }

    public deleteStatus(body: any):Promise<any>{
        return this.post(`/Status/DeleteStatuses`, body)
    }

    public updateStatus(body:any){
        return this.put("/Status/UpdateStatus", body)
    }

   public createStatus(body: any){
        return this.post("/Status/CreateStatus", body)
   }
}