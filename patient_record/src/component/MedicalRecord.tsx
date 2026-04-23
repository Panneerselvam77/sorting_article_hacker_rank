// Interface for a single medical record

export interface Vitals {
  bloodPressureDiastole: number;
  bloodPressureSystole: number;
  pulse: number;
  breathingRate: number;
  bodyTemperature: number;
}

export interface Diagnosis {
  id: number;
  name: string;
  severity: number;
}

export interface Doctor {
  id: number;
  name: string;
}

export interface Meta {
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

// Type for the top-level grouped record shape from mock data
export interface RecordGroup {
  id: string;
  data: MedicalRecord[];
}
