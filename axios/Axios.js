import axios from "axios"
import { subdomain } from "../config/Url.js"

export const Axios=axios.create({
    baseURL:subdomain,
    withCredentials:true,
    headers:({
        "Content-Type":"application/json"
    })

})