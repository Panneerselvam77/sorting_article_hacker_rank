// Interface for a single medical record
interface Vitals {
  bloodPressureDiastole: number;
  bloodPressureSystole: number;
  pulse: number;
  breathingRate: number;
  bodyTemperature: number;
}
interface Diagnosis {
  id: number;
  name: string;
  severity: number;
}
interface Doctor {
  id: number;
  name: string;
}
interface Meta {
  height: number;
  weight: number;
}
export interface MedicalRecord {
  id: number;
  timestamp: number;
  diagnosis: Diagnosis;
  vitals: Vitals;
  doctor: Doctor;
  userId: number;
  userName: string;
  userDob: string;
  meta: Meta;
}
