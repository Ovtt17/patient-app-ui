import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../api/admin.api";

export const useDoctores = () => {
  return useQuery({
    queryKey: ["doctores"],    
    queryFn: getAllDoctors,     
    staleTime: 1000 * 60,      
    retry: 2,                   
  });
};
