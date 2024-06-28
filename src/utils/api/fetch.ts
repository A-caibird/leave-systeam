const SERVER_URI0: string = "http://192.168.122.150:5133";
// const SERVER_URI1: string = "http://localhost:5133";
export function Fetch(path: string, option?: RequestInit) {
    const defaultConfig: RequestInit = {
        method: "GET",
        mode: "cors",
        credentials: "omit",
        cache: "default",
        redirect: "follow",
    }
    const config: RequestInit = {
        ...defaultConfig,
        ...option
    }
    return fetch(SERVER_URI0 + path, config)
}
export default Fetch
