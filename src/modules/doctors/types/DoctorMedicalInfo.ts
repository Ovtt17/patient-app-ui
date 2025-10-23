export interface DoctorMedicalInfo {
  medicalLicense: string;
  officeNumber: string;
  specialtyIds?: number[] | null;
  appointmentDuration: number;
}