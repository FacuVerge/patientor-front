export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  Healthy = '0',
  LowRisk = '1',
  HighRisk = '2',
  CriticalRisk = '3'
}

export enum Type {
  Hospital = 'Hospital',
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthCare'
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;

  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthCare";
  employerName: string;
  sickLeave: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry = 
  | OccupationalHealthCareEntry 
  | HospitalEntry 
  | HealthCheckEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryFormValues = UnionOmit<Entry, "id">;