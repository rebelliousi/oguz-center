import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface CompanyType{
    name:string;
    icon:string;
    title:string
    id:number
}

const getCompanies=async():Promise<CompanyType[]>=>{
    const response=await api.get('/companies/')
    return response.data
}

export const useCompanies=()=>{
    return useQuery<CompanyType[]>({
        queryKey:['companies'],
        queryFn:getCompanies
    })
}