import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface AboutType{
    title:string;
    video:string;
}

const getAbout=async():Promise<AboutType[]>=>{
    const response=await api.get('/about/')
    return response.data
}

export const useAbout=()=>{
    return useQuery<AboutType[]>({
        queryKey:['about'],
        queryFn:getAbout
    })
}