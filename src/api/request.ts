import axios from "axios";

//  const myUrl = "https://www.roagt.ml/api/"

// export const request = axios.create({
     
//     //  baseURL: myUrl,
//       baseURL: "https://localhost:7271/api/",
//     headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
// })

let myUrl ="https://localhost:7271/api/";
if( window.location.hostname === "localhost")
{
    // console.log(window.location.hostname)
    //myUrl = "https://www.roagt.ml/api/"

}
else{
    // console.log(window.location.hostname)
    myUrl = "https://www.roagt.ml/api/"
}

export const request = axios.create({
     
     baseURL: myUrl,
    // baseURL: "https://localhost:7271/api/",
    headers: {"Authorization" : `Bearer ${localStorage.getItem("token")}`}
})


