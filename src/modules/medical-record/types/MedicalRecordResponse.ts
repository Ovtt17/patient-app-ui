export interface MedicalRecordResponse {
  id: number;
  patientId: string;
  appointmentId: number;
  weight: number;
  height: number;
  bloodType: string;
  allergies: string;
  chronicDiseases: string;
  medications: string;
  diagnostic: string;
  createdDate: string;
}