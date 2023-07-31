import { POST } from "@/utils/axios";

export const onLogin = async (body: any) => {
  return await POST(`/signin`, body);
};
