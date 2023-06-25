import Image from "next/image";
import { useForm } from "react-hook-form";
import { ILoginFormInput } from "@/utils/types";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginFormInput>({ mode: "onBlur" });
  return (
    <div className="w-[100vw] h-[100vh] bg-app_gray_900 flex justify-center items-center">
      <div className="w-[37.5%] h-full flex flex-col justify-center items-center mb-10">
        <div className="w-[43.5%] h-9 relative">
          <Image
            src="/images/appLogo.png"
            alt="appLogo"
            fill
            sizes={"100%"}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="w-full flex flex-col justify-start items-center p-10 bg-app_gray_850 rounded-3xl">
          <div className="w-full flex flex-col gap-2 text-lg mb-6">
            <div className="text-font_gray_400 self-start">ID</div>
            <input
              className="w-full h-14 rounded-[80px] py-4 px-8 text-sm"
              {...register("id", {
                required: "아이디를 입력해주세요",
              })}
              placeholder="아이디를 입력해주세요"
            />
          </div>
          <div className="w-full flex flex-col gap-2 mb-8">
            <div className="text-font_gray_400 self-start">PW</div>
            <input
              type="password"
              className="w-full h-14 rounded-[80px] py-4 px-8 text-sm"
              {...register("pw", {
                required: "비밀번호를 입력해주세요",
              })}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <button className="mt-8 w-full h-14 rounded-[80px] p-4 bg-app_healthier_blue text-white text-base">
            로그인 하기
          </button>
          <table className="mt-12 border-collapse w-full text-center text-font_gray_400">
            <tbody>
              <tr>
                <th className="border-r-2 border-gray-600">아이디 찾기</th>
                <th className="border-r-2 border-gray-600">비밀번호 찾기</th>
                <th className="">회원가입 하기</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Login;
