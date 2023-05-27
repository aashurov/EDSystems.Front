import { ApiContext } from "../ApiContext";
import { IdProps } from "../AppDto";

export class UserApi extends ApiContext{
    
    public getAllUsers({pageNumber, pageSize, roleId }:any):Promise<any>{
        return this.get(`/UserManager/GetUserListWithPagination?pageNumber=${pageNumber}&pageSize=${pageSize}&RoleId=${roleId}`)
    }

    public getAllUsersWithSearchText({pageNumber, pageSize, roleId, searchText }:any):Promise<any>{
        
        if(searchText=='')
        {
            return this.get(`/UserManager/GetUserListWithPaginationWithSearchText?pageNumber=${pageNumber}&pageSize=${pageSize}&RoleId=${roleId}`)
        }
        else {
            //console.log(searchText)
            return this.get(`/UserManager/GetUserListWithPaginationWithSearchText?pageNumber=${pageNumber}&pageSize=${pageSize}&RoleId=${roleId}&searchText=${searchText}`)
        }
    }

    public getAllUsersWithoutPagination(roleId: number): Promise<any>{
        return this.get(`/UserManager/GetUserList?RoleId=${roleId}`)
    }

    public getUserById({id}:IdProps):Promise<any>{
        return this.get(`/UserManager/GetUserDetails/${id}`)
    }

    public deleteUser(id: any):Promise<any>{
        return this.delete(`/UserManager/DeleteUser/${id}`)
    }

    public updateUser(body:any){
        return this.put("/UserManager/UpdateUser", body)
    }

   public createUser(body: any){
        return this.post("/UserManager/CreateUser", body)
   }
}