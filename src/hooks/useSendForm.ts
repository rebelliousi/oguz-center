import { useMutation } from "@tanstack/react-query";
import { api } from "../api"; 

export interface FormDataType {
  full_name: string;
  gmail: string;
  about_you: string;
  phone_number: string;
  description: string;
  file: File | null; 
}

const submitForm = async (data: FormDataType) => {
  const formData = new FormData();
  formData.append("full_name", data.full_name);
  formData.append("gmail", data.gmail);
  formData.append("about_you", data.about_you);
  formData.append("phone_number", data.phone_number);
  formData.append("description", data.description);
  if (data.file) formData.append("file", data.file);

  const response = await api.post("/contact/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: submitForm,
  });
};
