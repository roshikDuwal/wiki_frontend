import { Axios } from "../axios/Axios"


export const getPost=()=>{
    const getpost=Axios.get("/")
    return getpost
}

export const getSinglePost=(id)=>{
    const getsinglePost=Axios.get(`/${id}`)
    return getsinglePost
}

export const addPost=async(data)=>{
    const addpost=await Axios.post("/addpost",data)
    return addpost
}

export const deletePost=async(id)=>{
    const deletepost=await Axios.delete(`/${id}`)
    return deletepost
}

export const updatePost=async({id,data})=>{
    
    const updatepost=await Axios.put(`/edit/${id}`,data)
    return updatepost

}

export const likeCountPost=async(id)=>{
    const likecountpost=await Axios.post(`/like/${id}`)
    return likecountpost
}