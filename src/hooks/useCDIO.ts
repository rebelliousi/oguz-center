import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface CDIOType{
    name:string;
    description:string;
    icon:string;

}

const getCDIO=async():Promise<CDIOType[]>=>{
    const response=await api.get('/collaborators/');
    return response.data
}
export const useCDIO=()=>{
    return useQuery<CDIOType[]>({
        queryKey:['cdio'],
        queryFn:getCDIO
    })
}