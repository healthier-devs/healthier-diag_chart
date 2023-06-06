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
    <div className="w-[100vw] h-[100vh] bg-app_indigo flex justify-center items-center">
      <div className="w-1/5 h-full flex flex-col justify-center items-center">
        <div className="w-[calc(33vw)] h-20 relative">
          <Image
            src="/images/appLogo.png"
            alt="appLogo"
            fill
            sizes={"100%"}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="mt-5 w-full flex flex-col justify-start items-center gap-4">
          <div className="w-full flex flex-col gap-2 text-lg">
            <div className="text-font_gray self-start">ID</div>
            <input
              className="w-full h-16 rounded-sm p-4"
              {...register("id", {
                required: "아이디를 입력해주세요",
              })}
              placeholder="아이디를 입력해주세요"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="text-font_gray self-start">PW</div>

            <input
              className="w-full h-16 rounded-sm p-4"
              {...register("pw", {
                required: "비밀번호를 입력해주세요",
              })}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <button className="mt-8 w-full h-16 rounded-xl p-4 bg-white text-xl">
            LOGIN
          </button>
        </div>
        <table className="mt-12 border-collapse w-full text-center text-xl text-font_gray">
          <tr>
            <th className="border-r">아이디 찾기</th>
            <th className="border-r">비밀번호 찾기</th>
            <th className="">회원가입</th>
          </tr>
        </table>
      </div>
    </div>
  );
};
export default Login;
