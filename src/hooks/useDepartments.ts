import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface DepartmentType{
    name:string;
    description:string;
    icon:string
}
 
const getDepartments=async():Promise<DepartmentType[]>=>{
    const response=await api.get('/departments/')
    return response.data
}

export const useDepartments=()=>{
    return useQuery<DepartmentType[]>({
        queryKey:['departments'],
        queryFn:getDepartments
    })
}