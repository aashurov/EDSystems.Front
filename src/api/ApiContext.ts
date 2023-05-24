import { request } from "./request";

export class ApiContext{
    public get(url: string){
       return request.get(url)
    }
    public post(url: string, body: any){
        return request.post(url, body)
    }
    public put(url: string, body: any){
        return request.put(url, body)
    }
    public delete(url: string){
        return request.delete(url)
    }
}