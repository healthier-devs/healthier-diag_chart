import Image from "next/image";
import appLogoSrc from "@/assets/images/appLogo.png";
import { useState } from "react";
import { onLogin } from "@/api/auth";
import { setCookie } from "@/utils/cookies";
import { useRouter } from "next/router";

const Login = () => {
  const Router = useRouter();
  const [loginData, setLoginData] = useState({
    id: "",
    pw: "",
  });

  const handleLogin = () => {
    if (loginData.id === "" || loginData.pw === "") {
      alert("아이디와 비밀번호를 입력해주세요");
    } else {
      onLogin({
        username: loginData.id,
        password: loginData.pw,
      })
        .then((res) => {
          if (res.accessToken === undefined) {
            throw new Error("아이디와 비밀번호를 확인해주세요");
          } else {
            localStorage.setItem(
              "refreshToken",
              JSON.stringify(res.refreshToken)
            );
            localStorage.setItem("accessToken", res.accessToken); // cookie저장으로 바꾸기
            Router.push("/patientList");
          }
        })
        .catch((err) => {
          alert("아이디와 비밀번호를 확인해주세요");
        });
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-app_gray_900 flex justify-center items-center">
      <div className="w-[37.5%] h-full flex flex-col justify-center items-center mb-10">
        <div className="w-[43.5%] h-9 relative mb-10">
          <Image
            src={appLogoSrc}
            alt="appLogo"
            fill
            sizes={"100%"}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex flex-col items-center justify-start w-full p-10 bg-app_gray_850 rounded-3xl">
          <div className="flex flex-col w-full gap-2 mb-6 text-lg">
            <div className="self-start text-font_gray_400">ID</div>
            <input
              className="w-full h-14 rounded-[80px] py-4 px-8 text-sm"
              placeholder="아이디를 입력해주세요"
              value={loginData.id}
              onChange={(e) => {
                setLoginData({ ...loginData, id: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-2 mb-8">
            <div className="self-start text-font_gray_400">PW</div>
            <input
              type="password"
              className="w-full h-14 rounded-[80px] py-4 px-8 text-sm"
              placeholder="비밀번호를 입력해주세요"
              value={loginData.pw}
              onChange={(e) => {
                setLoginData({ ...loginData, pw: e.target.value });
              }}
            />
          </div>
          <button
            className="mt-8 w-full h-14 rounded-[80px] p-4 bg-app_healthier_blue text-white text-base"
            onClick={handleLogin}
          >
            로그인 하기
          </button>
          <table className="w-full mt-12 font-medium text-center border-collapse text-font_gray_400">
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
