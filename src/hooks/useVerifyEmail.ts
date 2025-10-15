import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export interface VerifyEmailType{
    gmail:string;
    verification_code:string;
}

const verifyEmail=async(data:VerifyEmailType)=>{
    const response=await api.post('/contact/verify-email/',data);
    return response.data;
}

export const useVerifyEmail=()=>{
    return useMutation({
        mutationFn:verifyEmail
        
    })
}