import { SidebarMenu } from "@/assets/sidebarMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logoSrc from "@/assets/images/appLogo_black.png";
import { useEffect, useState } from "react";
import { getPatientList } from "@/api/patient";
import moment from "moment";
import { useRecoilState } from "recoil";
import { patientRecoilList } from "@/utils/atom";
import { getHospitalInfo, onReissue } from "@/api/auth";

const Sidebar = () => {
  const [patientList, setPatientList] = useRecoilState(patientRecoilList);
  const Router = useRouter();

  const fetchApi = async () => {
    const pL = await getPatientList(
      0,
      20,
      undefined,
      moment(new Date()).format("YYYY-MM-DD")
    );
    console.log("pL:", pL);
    if (pL.code === "ERR_NETWORK") {
      const wait = await onReissue();
      console.log("reissue:", wait);
    } else {
      setPatientList(pL.patientList);
      const hospitalInfo = await getHospitalInfo();
      console.log("hospital", hospitalInfo);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const Profile = () => {
    return (
      <div className="w-full flex flex-col justify-start gap-1 pb-5 border-b-[0.4px] border-[#c5c8ce]">
        <div className="text-xs text-font_healthier_blue">세브란스 병원</div>
        <div className="text-lg font-bold leading-5">홍길동 원장님</div>
      </div>
    );
  };
  interface IPCType {
    data: any;
  }
  const PatientComponent = ({ data }: IPCType) => {
    const selected = Router.query.id === data.soapUuid;
    return (
      <div
        onClick={() => Router.push(`/diagchart/${data.soapUuid}`)}
        className={`${
          selected ? "bg-[#5464f2] bg-opacity-[12%]" : "hover:bg-app_gray_200"
        } w-full h-7 flex flex-row py-4 px-2.5 rounded-md gap-2.5 items-center leading-5 cursor-pointer  `}
      >
        <span className="text-[12px] text-font_gray_600 font-bold">
          {data.patient.name}
        </span>
        <span className="text-[10px] text-app_gray_400_body_2 font-medium tracking-[-0.3px]">
          {data.patient.gender === "f" ? "여" : "남"}∙
          {data.patient.birthDate
            ? moment(data.patient.birthDate).format("YYYY.MM.DD")
            : ""}
        </span>
      </div>
    );
  };
  return (
    <nav
      className={`w-Sidebar h-full bg-app_healthier_sidebar flex flex-col px-4 justify-start items-start border-r border-app_stroke_gray_200 rounded-xl `}
    >
      {/* Logo Container */}
      <div className="w-[120px] h-[20px] flex self-center relative mt-8">
        <Image
          src={logoSrc}
          alt="App Logo"
          fill
          sizes={"100%"}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRoQEAABXRUJQVlA4WAoAAAAgAAAAhQIAcAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgglgIAANAdAJ0BKoYCcQA/DYa5WawopSOgKLGAIYlnbt1dKxgLZMe5nyAK+xq/uMcKWXVXTcqGD6yKJf3GBowfWPbUUd51lR75wR7PwDisH1/as7Fa3x4fOZTXf3KeNHwX0Y4bP44xv+nkBEx74GRNQRIhoXs0FjBMvJ4gyiK+sjuJgItzVZIZUmtRZp7wwfXGPoRQ6sqPcYVs4lHlyvkuTpi02c3QRvAPfhgFLby+038+r/+OBHt2MDag/wW+LFJueFR7jC0Xv8bzjl/dAE75LufFQ01me+7SL92qZuFK9C9yles3kKA3ACVcolZWH+S4Yhjd3Tg55/GXmsAA/uhQqf1E/Un9vRDQQsm+fI+hBWlwHS4mq0eEgl52AQUiwAdSqimBlIKVRzFjqmqcAAAAQF+kDxtdNeRH0L7EV6fY6Lq0nIf6f679yrf20pkGazvdbt4GYcI2FNFvq1WzjMAfVlj+4n4BUl3RbLxnp0OQujisahb5q+Wz6BwSxsrj8JMkBco4tCXg6PN/2CN8ljfJbj+aA+6Jqn8XR5htjqHWCJVj3FwPdgE00QOKRU0yyYCmVlS+wUUqAByo3Kb8B5NJg7v1m3P6jjmlaLpWIeklcHTpmeXJbRN8Q4tZA4ctpeXnFMnBOETgDbXmRdfwdFr2Wtr993LGzhrhmCa1VXsBU+xwWEyLekSYBZ11bQw/VxVlptJ8cLEIvKGAmYpBR1gcC8BfQAdqZbYCUNHazIMbQ9KT+gABKg6HdA+syjtrvD6jBGz6M+YGIG6CxuQW0gDeI7HMPFQcDVOl4UHNTeqB3GSBDw40gAEllyY8GT4XW4cJwRn8x6E6D6wAz2gbGzBkt4ldubuLCjF1zbsUAAMQNiJxIhAx2ZdGgAAA"
          style={{ objectFit: "contain" }}
        />
      </div>
      {/* Profile Container */}
      <div className="w-full mt-12">
        <Profile />
      </div>
      <div className="flex flex-col justify-start w-full gap-2 mt-5">
        <div className="w-full h-9 bg-app_blue_500 bg-opacity-[0.12] rounded-md py-2 px-2.5 text-app_gray_100 text-[14px] font-medium leading-5">
          환자 목록
        </div>
        <div className="w-full gap-0.5 flex flex-col justify-start overflow-y-auto">
          {patientList &&
            patientList.map((data, idx) => {
              return <PatientComponent key={idx} data={data} />;
            })}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
