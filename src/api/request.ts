import axios from "axios";

export const request = axios.create({
    //baseURL: "https://www.roagt.ml/api/",
     baseURL: "https://localhost:7271/api/",
    
    headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
})
