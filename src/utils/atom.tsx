import { atom } from "recoil";

interface PatientDataProps {
  visitRecordId: string;
  patient: {
    name: string;
    birthDate: string;
    gender: string;
    age: number;
  };
  submitTime: string;
  cc: string;
  soapUuid: string;
  status: string;
}

export const searchWaitingPatient = atom({
  key: "searchWaitingPatient",
  default: "",
});

export const searchCompletePatient = atom({
  key: "searchCompletePatient",
  default: "",
});

export const patientRecoilList = atom<PatientDataProps[]>({
  key: "patientList",
  default: [],
});
