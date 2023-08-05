import { GET, PATCH } from "@/utils/axios";
import { getCookie } from "@/utils/cookies";
import moment from "moment";

export const getPatientList = async (
  pageNum: number = 0,
  limit: number = 20,
  name?: string,
  date: string = moment(new Date()).format("YYYY-MM-DD")
) => {
  return await GET("/visitrecords", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    params: {
      pageNum,
      limit,
      name,
      date,
    },
  });
};

export const getDiagChart = async (uuid: string) => {
  return await GET(`/soaps/${uuid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const noteDiagChart = async (uuid: string, body: any) => {
  return await PATCH(`/soaps/${uuid}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

export const patchDiagStatus = async (
  uuid: string,
  status: string = "IN_PROGRESS"
) => {
  return await PATCH(
    `/visitrecords/${uuid}?status=${status}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};
