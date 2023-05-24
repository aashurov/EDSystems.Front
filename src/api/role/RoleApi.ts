import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";
import { GetAllRole } from "./RoleDto";

export class RoleApi extends ApiContext{
    
    public getAllRole({pageNumber, pageSize}:GetAllRole):Promise<any>{
        return this.get(`/RoleManager/GetRoleListWithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    }

    public getRoleById({id}:IdProps):Promise<any>{
        return this.get(`/RoleManager/GetRoleDetails/${id}`)
    }

    public deleteRole({id}:IdProps):Promise<any>{
        return this.delete(`/RoleManager/DeleteRole/${id}`)
    }

    public updateRole(body:any){
        return this.put("/RoleManager/UpdateRole", body)
    }

   public createRole(body: any){
        return this.post("/RoleManager/CreateRole", body)
   }

   public getRoles(){
    return this.get("RoleManager/GetRoleList")
   }
}