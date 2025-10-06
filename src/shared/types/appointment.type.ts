export type AppointmentStatus =
  | "PENDIENTE"
  | "CONFIRMADA"
  | "CANCELADA"
  | "COMPLETADA"
  | "AUSENTE";

export interface AppointmentReq {
  doctorId: string;       
  patientId: string;      
  appointmentDate: string; 
  reason: string;
}

export interface AppointmentRes {
  id: number;
  doctorId: string;
  patientId: string;
  appointmentDate: string;          
  endTime: string;                 
  estimatedDurationMinutes: number | null;
  reason: string;
  notes: string | null;
  status: AppointmentStatus;        
  createdDate: string;              
  lastModifiedDate: string;         
}