import { GET, POST } from "@/utils/axios";

export const onLogin = async (body: any) => {
  const data = await POST(`/signin`, body);

  return data;
};

export const onReissue = async () => {
  POST(`/reissue`, {
    refreshToken: localStorage.getItem("refreshToken"),
    accessToken: localStorage.getItem("accessToken"),
  })
    .then((res) => {
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getHospitalInfo = async () => {
  return await GET("/info", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};
