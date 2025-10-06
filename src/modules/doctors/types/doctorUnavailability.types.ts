export interface DoctorUnavailabilityReq{
  startTime: string; 
  endTime: string;  
  doctorId: string;
}   

export interface DoctorUnavailabilityRes{
  id: number;       
  doctorId: string;  
  startTime: string; 
  endTime: string; 
}