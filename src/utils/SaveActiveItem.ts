export function SaveActiveItem(type:string, string: string){
    const indexs = [], _char = "/";
    let i = -1, new_str = "";
    while((i = string.indexOf(_char, i + 1)) >= 0){
        indexs.push(i);
    }
    if(type === "tab"){
        new_str = string.substring(indexs[1]+1, indexs[2])
    }if(type === "childTab"){
        new_str = string.substring(indexs[2]+1, indexs[3])
    }
    return new_str;
}