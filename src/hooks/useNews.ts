import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface NewsType{
    title:string;
    description:string;
    image:string;
    date:string;
    id:number;
}

const getNews=async():Promise<NewsType[]>=>{
   const response=await api.get('/news/')
   return response.data
}
export const useNews=()=>{
    return useQuery<NewsType[]>({
        queryKey:['news'],
        queryFn:getNews
    })
}