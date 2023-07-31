import { atom } from "recoil";

export const searchWaitingPatient = atom({
  key: "searchWaitingPatient",
  default: "",
});

export const searchCompletePatient = atom({
  key: "searchCompletePatient",
  default: "",
});
