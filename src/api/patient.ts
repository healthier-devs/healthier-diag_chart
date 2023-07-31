import { GET, PATCH } from "@/utils/axios";
import { getCookie } from "@/utils/cookies";

export const getPatientList = async (
  pageNum: number = 0,
  limit: number = 20
) => {
  return await GET("/visitrecords", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    params: {
      pageNum,
      limit,
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
