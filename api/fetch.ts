export function Fetch(path:string,option?:RequestInit){
    const defaultConfig:RequestInit={
        method:"GET",
        mode:"cors",
        credentials:"include",
        cache:"default",
        redirect:"follow"
    }
    const config:RequestInit={
        ...defaultConfig,
        ...option
    }
    return fetch(path,config)
}
