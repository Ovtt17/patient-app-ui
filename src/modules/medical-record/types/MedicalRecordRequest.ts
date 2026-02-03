export interface MedicalRecordRequest {
  patientId: string;
  doctorId: string;
  appointmentId: number;
  weight: number | null;
  height: number | null;
  bloodType: string | null;
  allergies: string | null;
  chronicDiseases: string | null;
  medications: string | null;
  diagnostic: string | null;
}